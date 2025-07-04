#!/bin/sh
echo "TERM=xterm-256color" >> ~/.bashrc
echo "mkdir -p /Application/Bin" >> ~/.bashrc
echo "cd /Application && composer install -n" >> ~/.bashrc # when no internet connection it hangs: file bug report !
echo "cp /Application/vendor/raxon/framework/Bin/Raxon.php /Application/Bin/Raxon.php" >> ~/.bashrc
echo "php /Application/Bin/Raxon.php bin app" >> ~/.bashrc
echo "app install raxon/boot -skip=cache-clear -lock=release" >> ~/.bashrc
echo "chown root:root /Application/start.sh" >> ~/.bashrc
echo "chown root:root /Application/enter.sh" >> ~/.bashrc
# echo "/usr/bin/php /mnt/Vps3/Mount/Package/Raxon/Parse/Test/Php/1-100/Batch.To.Webm.php &" >> ~/.bashrc
echo "app info all" >> ~/.bashrc
