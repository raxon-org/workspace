{{RAX}}
{{require(config('controller.dir.view') + config('controller.title') + '/Init.tpl')}}
{{script('module')}}
{{require(config('controller.dir.view') + config('controller.title') + '/Module/Setup.js')}}
{{/script}}
{{require(config('controller.dir.view') + config('controller.title') + '/Section/Setup.tpl')}}