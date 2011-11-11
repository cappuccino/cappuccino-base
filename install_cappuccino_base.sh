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

    # Don't include JSC binaries. They should be built on the target machine by bootstrap.
    # \.(o|dylib|a|la|lo|lai) were already excluded by the rsync exclude.
    for jsc_bin in "packages/narwhal-jsc/bin/narwhal-webkit" "packages/narwhal-jsc/deps/libedit-20100424-3.0/config.h"  "packages/narwhal-jsc/deps/libedit-20100424-3.0/config.log" "packages/narwhal-jsc/deps/libedit-20100424-3.0/config.status" "packages/narwhal-jsc/deps/libedit-20100424-3.0/doc/editline.3" "packages/narwhal-jsc/deps/libedit-20100424-3.0/doc/editrc.5" "packages/narwhal-jsc/deps/libedit-20100424-3.0/doc/Makefile" "packages/narwhal-jsc/deps/libedit-20100424-3.0/examples/.libs/fileman" "packages/narwhal-jsc/deps/libedit-20100424-3.0/examples/.libs/tc1" "packages/narwhal-jsc/deps/libedit-20100424-3.0/examples/fileman" "packages/narwhal-jsc/deps/libedit-20100424-3.0/examples/Makefile" "packages/narwhal-jsc/deps/libedit-20100424-3.0/examples/tc1" "packages/narwhal-jsc/deps/libedit-20100424-3.0/libedit.pc" "packages/narwhal-jsc/deps/libedit-20100424-3.0/libtool" "packages/narwhal-jsc/deps/libedit-20100424-3.0/Makefile" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/.libs/libedit.0.dylib.dSYM/Contents/Info.plist" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/common.h" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/emacs.h" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/fcns.c" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/fcns.h" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/help.c" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/help.h" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/Makefile" "packages/narwhal-jsc/deps/libedit-20100424-3.0/src/vi.h" "packages/narwhal-jsc/deps/libedit-20100424-3.0/stamp-h1" "packages/narwhal-jsc/include/config.h" "packages/narwhal-jsc/narwhal-jsc.conf"
    do
        rm "$jsc_bin";
    done

    # Make links relative.
    for link in "cappuccino/bin/capp" "cappuccino/bin/cib-dump" "objective-j/bin/cplutil" "cappuccino/bin/flatten" "jake/bin/jake" "narwhal-jsc/bin/narwhal-jsc" "cappuccino/bin/nib2cib" "objective-j/bin/objj" "objective-j/bin/objjc" "OJTest/bin/ojautotest" "OJTest/bin/ojautotest-run" "cappuccino/bin/ojdepcheck" "OJTest/bin/ojtest" "cappuccino/bin/press" "shrinksafe/bin/shrinksafe" "narwhal-jsc/bin/source-test.sh" "cappuccino/bin/fontinfo" "cappuccino/bin/xcodecapp"
    do
        filename=`basename "$link"`
        (cd bin && ln -sf "../packages/$link" "$filename");
    done
    (cd bin && ln -sf narwhal js)
    (cd bin && ln -sf activate.bash activate)

    # Not sure why this bit isn't already set.
    chmod a+x packages/cappuccino/support/XcodeCapp.app/Contents/MacOS/XcodeCapp

    echo "Version size: `du -sh \"$destination\"`"

    echo "Commit the new build?"
    if prompt "yes"; then
        git add -A .
        git add -A  --force packages/*
        git add -A  --force packages/narwhal-jsc/deps/*
        git add -A  --force bin/*

        git commit
    fi
fi
