{{$register = Package.Raxon.Filesystem:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.Filesystem:Import:role.system()}}
{{$flags = flags()}}
{{$options = options()}}
{{Package.Raxon.Filesystem:Main:install($flags, $options)}}
{{/if}}