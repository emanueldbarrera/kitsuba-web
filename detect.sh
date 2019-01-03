#!/usr/bin/env bash

# convenience functions
source "$(cd $(dirname $0); cd ..; pwd)"/bin/util/common.sh

if [[ -f "$1/composer.json" || -f "$1/index.php" ]]; then
	echo "PHP" && exit 0
else
	error <<-EOF
		Application not supported by this buildpack!
		
		The 'heroku/php' buildpack is set on this application, but was
		unable to detect a PHP codebase.
		
		A PHP app on Heroku requires a 'composer.json' at the root of
		the directory structure, or an 'index.php' for legacy behavior.
		
		If you are trying to deploy a PHP application, ensure that one
		of these files is present at the top level directory.
		
		If you are trying to deploy an application written in another
		language, you need to change the list of buildpacks set on your
		Heroku app using the 'heroku buildpacks' command.
		
		For more information, refer to the following documentation:
		https://devcenter.heroku.com/articles/buildpacks
		https://devcenter.heroku.com/articles/php-support#activation
	EOF
fi