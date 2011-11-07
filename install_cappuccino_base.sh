#!/usr/bin/env bash

function prompt () {
    if [ "$noprompt" ] && [ "$#" = "1" ]; then
        if [ "$1" = "yes" ]; then
            echo "DEFAULT: yes"
            return 0
        else
            echo "DEFAULT: no"
            return 1
        fi
    fi

    while true; do
        echo "Enter \"yes\" or \"no\": "
        read response
        case $response
        in
            Y*) return 0 ;;
            y*) return 0 ;;
            N*) return 1 ;;
            n*) return 1 ;;
            *)
        esac
    done
}

destination=`pwd`
cappuccino_source="/usr/local/narwhal"
if ! echo $destination | grep cappuccino-base; then
    echo "This script should be run from within cappuccino-base."
    exit 1
fi

echo "Install $cappuccino_source in $destination?"
echo "WARNING: all files not supposed to be in the folder will be deleted."
if prompt "no"; then
    rsync -acvP --exclude-from install_cappuccino_exclude.rsync --delete "$cappuccino_source/" "$destination"

    # Make links relative.

    for link in "cappuccino/bin/capp" "cappuccino/bin/cib-dump" "objective-j/bin/cplutil" "cappuccino/bin/flatten" "jake/bin/jake" "narwhal-jsc/bin/narwhal-jsc" "cappuccino/bin/nib2cib" "objective-j/bin/objj" "objective-j/bin/objjc" "OJTest/bin/ojautotest" "OJTest/bin/ojautotest-run" "cappuccino/bin/ojdepcheck" "OJTest/bin/ojtest" "cappuccino/bin/press" "shrinksafe/bin/shrinksafe" "narwhal-jsc/bin/source-test.sh"
    do
        filename=`basename "$link"`
        (cd bin && ln -sf "../packages/$link" "$filename");
    done
    (cd bin && ln -sf narwhal js)
    (cd bin && ln -sf activate.bash activate)

    echo "Version size: `du -sh \"$destination\"`"

    echo "Commit the new build?"
    if prompt "yes"; then
        git add .
        git add --force packages/*
        git add --force packages/narwhal-jsc/deps/*
        git add --force bin/*

        git commit
    fi
fi
