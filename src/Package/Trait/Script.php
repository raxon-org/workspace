<?php
namespace Package\Raxon\Workspace\Trait;

use Exception;
use Raxon\Module\Controller;

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
        if(!property_exists($options, 'script')){
            throw new Exception('Options: script[] not found');
        }
        if(!is_array($options->script)){
            throw new Exception('Options: script[] is not an array');
        }
        $url = $object->config('project.dir.domain') .
            Controller::name($options->frontend->host) .
            $object->config('ds') .
            'Data' .
            $object->config('ds') .
            'Main' .
            $object->config('extension.json')
        ;
        $data = $object->data_read($url);
        $script = $data->get('script') ?? [];
        foreach($options->script as $nr => $source){
            $script[] = $source;
        }
        $data->set('script', $script);
        $data->write($url);
        echo "Script added..." . PHP_EOL;
    }

    /**
     * @throws Exception
     */
    public function delete($flags, $options): void
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
        if(!property_exists($options, 'index')){
            throw new Exception('Options: index not found, from 0 to ...');
        }
        $url = $object->config('project.dir.domain') .
            Controller::name($options->frontend->host) .
            $object->config('ds') .
            'Data' .
            $object->config('ds') .
            'Main' .
            $object->config('extension.json')
        ;
        $data = $object->data_read($url);
        $script = $data->get('script') ?? [];
        $echo = false;
        foreach($script as $nr => $source){
            if($nr === $options->index){
                $echo = $source;
                unset($script[$nr]);
                break;
            }
        }
        $data->set('script', $script);
        $data->write($url);
        echo "Script deleted:"  . $echo . PHP_EOL;
    }

    /**
     * @throws Exception
     */
    public function has($flags, $options): void
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
        if(!property_exists($options, 'script')){
            throw new Exception('Options: script[] not found');
        }
        if(!is_array($options->script)){
            throw new Exception('Options: script[] is not an array');
        }
        $url = $object->config('project.dir.domain') .
            Controller::name($options->frontend->host) .
            $object->config('ds') .
            'Data' .
            $object->config('ds') .
            'Main' .
            $object->config('extension.json')
        ;
        $data = $object->data_read($url);
        $script = $data->get('script') ?? [];
        $matches = [];
        foreach($script as $nr => $source){
            foreach($options->script as $match_nr => $match){
                $is_match = false;
                if($source === $match){
                    $is_match = true;
                    break;
                }
                $matches[$match_nr] = true;
            }
        }
        foreach($options->script as $nr => $source){
            if(!isset($matches[$nr])){
                echo 'false' . PHP_EOL;
            } else {
                echo 'true' . PHP_EOL;
            }
        }
    }
}