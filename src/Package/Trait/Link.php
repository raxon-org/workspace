<?php
namespace Package\Raxon\Workspace\Trait;

use Exception;
use Raxon\Module\Controller;

trait Link {

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
        if(!property_exists($options, 'link')){
            throw new Exception('Options: link[] not found');
        }
        if(!is_array($options->link)){
            throw new Exception('Options: link[] is not an array');
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
        $link = $data->get('link') ?? [];
        foreach($options->link as $nr => $source){
            $link[] = $source;
        }
        $data->set('link', $link);
        $data->write($url);
        echo "Link added..." . PHP_EOL;
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
        $link = $data->get('link') ?? [];
        $echo = false;
        foreach($link as $nr => $source){
            if($nr === $options->index){
                $echo = $source;
                unset($link[$nr]);
                break;
            }
        }
        $data->set('link', $link);
        $data->write($url);
        echo "Link deleted:"  . $echo . PHP_EOL;
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
        if(!property_exists($options, 'link')){
            throw new Exception('Options: link[] not found');
        }
        if(!is_array($options->link)){
            throw new Exception('Options: link[] is not an array');
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
        $link = $data->get('link') ?? [];
        $matches = [];
        foreach($link as $nr => $source){
            foreach($options->link as $match_nr => $match){
                $is_match = false;
                if($source === $match){
                    $is_match = true;
                    $matches[$match_nr] = true;
                    break;
                }
            }
        }
        foreach($options->link as $nr => $source){
            if(!isset($matches[$nr])){
                echo 'false' . PHP_EOL;
            } else {
                echo 'true' . PHP_EOL;
            }
        }
    }
}