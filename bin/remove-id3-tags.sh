#!/bin/bash
# By Marko Haapala
# requirements:
# id3ed - apt-get install id3ed
IFS=$'\n'
for mp3_file in $(find ./ -type f -iname '*.mp3'); do
	id3ed -r "${mp3_file}"
done
