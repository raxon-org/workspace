<?php
namespace Package\Raxon\Workspace\Trait;
trait Script {

    public function add($flags, $options): void
    {
        $object = $this->object();
        $url = $object->config('controller.dir.data');
        d($url);

    }
}