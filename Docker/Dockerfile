FROM debian:12.11
WORKDIR /Application

# Update & upgrade
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && apt-get install init bash cron libzip-dev unzip wget curl bat nano php -y

# init
COPY ./Docker/Boot/start.php /usr/bin/start
COPY ./Docker/Boot/init /usr/bin/init
RUN chmod +x /usr/bin/init
RUN chmod +x /usr/bin/start

# composer
COPY ./Docker/Packages/composer/composer.phar /usr/bin/composer
RUN chmod +x /usr/bin/composer
RUN chown www-data:www-data /usr/bin/composer
RUN composer self-update

# ffmpeg
#RUN apt-get update && apt-get install ffmpeg -y

RUN apt-get update && apt-get install \
    lsb-release \
    apt-transport-https \
    apt-utils \
    ca-certificates \
    git \
    software-properties-common -y

### e-speak
# RUN apt-get update && apt-get install espeak-ng -y

# ADD sury pacakges for apache2 and php8.2, php8.3
RUN wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
RUN sh -c 'echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/php.list'

RUN apt-get update && apt-get install apache2 \
    php8.4 \
    php8.4-fpm \
    php8.4-common \
    php8.4-mysqli \
    php8.4-pdo \
    php8.4-gd \
    php8.4-intl \
    php8.4-imap \
    php8.4-sockets \
    php8.4-opcache \
    php8.4-mbstring \
    php8.4-readline \
    php8.4-curl \
    php8.4-zip \
    php8.4-xml \
    php8.4-dev \
    php8.4-sqlite3 \
    libapache2-mod-fcgid -y

RUN wget http://pear.php.net/go-pear.phar
RUN php go-pear.phar

RUN pecl channel-update pecl.php.net
RUN pecl install simdjson


# RUN apt-get update && apt-get install ffmpeg -y

# Install Ollama
# RUN curl -fsSL https://ollama.com/install.sh | sh

#RUN mv /root/.ollama/


# install cdrom
# RUN mkdir -p /mnt/Cdrom
# RUN chmod 777 /mnt/Cdrom

COPY . /Application

# Execute start script
RUN chmod +x /Application/start.sh
RUN sh /Application/start.sh
