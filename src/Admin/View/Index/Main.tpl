{{require(config('controller.dir.view') + config('controller.title') + '/Init.tpl')}}
{{require(config('controller.dir.view') + config('controller.title') + '/Section/Main.tpl')}}
{{script('module')}}
{{require(config('controller.dir.view') + 'User' + '/Module/Authorization.js')}}
{{/script}}
{{script('module')}}
{{require(config('controller.dir.view') + config('controller.title') + '/Module/Desktop.js')}}
{{/script}}
{{script('module')}}
{{require(config('controller.dir.view') + config('controller.title') + '/Module/Main.js')}}
{{/script}}