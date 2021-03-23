#!/bin/bash
set -euxo pipefail

curl -Lo main.zip 'https://github.com/hel-leen/iftproject/archive/main.zip'

rsync -P main.zip root@121.5.186.170:/tmp/ 

ssh root@121.5.186.170 'bash /root/fun.sh'

