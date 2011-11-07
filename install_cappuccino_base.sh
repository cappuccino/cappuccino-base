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

HERE=`pwd`
if ! echo $HERE | grep cappuccino-base; then
    echo "This script should be run from within cappuccino-base."
    exit 1
fi

echo "Install /usr/local/cappuccino in $HERE?"
echo "WARNING: all files not supposed to be in the folder will be deleted."
if prompt "no"; then
    rsync -acvP --exclude .git --exclude README.md --exclude install_cappuccino_base.sh --exclude README.markdown --exclude zips/\* --delete /usr/local/cappuccino/ "$HERE"
    echo "Version size: `du -sh \"$HERE\"`"

    echo "Commit the new build?"
    if prompt "yes"; then
        git add .
        git add --force packages/*
        git add --force packages/narwhal-jsc/deps/*
        git commit
    fi
fi
