<?php
namespace Package\Raxon\Workspace\Trait;
trait Script {

    public function add($flags, $options): void
    {
        $object = $this->object();
        d($flags);
        d($options);
        d($object->config('project.dir.domain'));
        d($object->config('project.dir'));


//        $url = $object->config('controller.dir.data');
//        d($url);

    }
}