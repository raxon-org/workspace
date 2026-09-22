let version = (value) => {
    return priya.collection('version', value);
}

let debug = {
    init: (data) => {
        console.log(data);
    },
    exception : (list) => {
        console.log(list);
        let exception_list = priya.collection('debug.exception') ?? [];
        for(let i = 0; i < list?.length; i++){
            if(!in_array(include[i], exception_list)){
                exception_list.push(list[i]);
            }
        }
        priya.collection('debug.exception', exception_list);
    },
    exception_exclude : (list) => {
        let step = priya.collection('state.debug.step_exclude') ?? 1;
        console.log('step: ' + step);
        if(step === 1){
            let exception_included = priya.collection('debug.exception') ?? [];
            console.log(exception_included);
            priya.collection('state.debug.exception', exception_included);
            let index = 0;
            let exception_included_list = [];
            for (index = 0; index < exception_included.length; index++) {
                let exception = exception_included[index];
                if (
                    list !== null &&
                    is.array(list) &&
                    in_array(exception, list, true)
                ) {
                    continue;
                }
                exception_included_list.push(exception);
            }
            step++;
            priya.collection('debug.exception', exception_included_list);
            priya.collection('state.debug.step_exclude', step);
        }
        else if(step === 2){
            let list = priya.collection('state.debug.exception') ?? [];
            priya.collection('debug.exception', list);
            priya.collection('delete', 'state.debug.step_exclude');
            priya.collection('delete', 'state.debug.exception');
        }

    }
}


export { version, debug };