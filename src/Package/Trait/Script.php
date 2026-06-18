<?php
namespace Package\Raxon\Workspace\Trait;

use Exception;
use Raxon\Module\Dir;

trait Script {

    /**
     * @throws Exception
     */
    public function add($flags, $options): void
    {
        $object = $this->object();

        if(!property_exists($options, 'frontend')){
            throw new Exception('Options: frontend.host not found');
        }
        if(!property_exists($options->frontend, 'host')){
            throw new Exception('Options: frontend.host not found');
        }
        if(!property_exists($options, 'backend')){
            throw new Exception('Options: backend.host not found');
        }
        if(!property_exists($options->backend, 'host')){
            throw new Exception('Options: backend.host not found');
        }
        $url = $object->config('project.dir.domain') . Dir::ucfirst($options->frontend->host) . 'Data' . $object->config('ds') . 'Main' . $object->config('extension.json');
        d($url);
        d($flags);
        d($options);


//        $url = $object->config('controller.dir.data');
//        d($url);

    }
}