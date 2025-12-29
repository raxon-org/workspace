{{$register = Package.Raxon.Workspace:Init:register()}}
{{if(!is.empty($register))}}
{{Package.Raxon.Workspace:Import:role.system()}}
{{$flags = flags()}}
{{$options = options()}}
{{Package.Raxon.Workspace:Main:install($flags, $options)}}
{{/if}}