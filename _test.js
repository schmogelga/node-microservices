const task = ( time, task, callback ) => {
    return new Promise( ( resolve, reject ) => {
        if( task != 'task 4' ){
            setTimeout( () => {
                resolve( callback() )
            }, time );
        } 
        else{
            reject( () => {
                throw new Error( `couldn't resolve task: ${task}` );
            })
        }
    });
}

const contextLetters = async () => {

    try {
        await task( 2000, 'task A', () => {
            console.log( "executando task A..." );
        })
    
        await task( 4000, 'task B', () => {
            console.log( "executando task B..." );
        })
    
        await task( 2000, 'task C', () => {
            console.log( "executando task C..." );
        })
    } catch (error) {
        console.log( 'contextLetter failed due: ' + error );
    }
}

const contextNumbers = async () => {

    for (let index = 0; index < 10; index++) {
        
        await task( 1000, `task ${index}`, () => {
            console.log( `executando task ${index}...` );
        })
        .then( () => console.log( `task ${index} finished!` ) )
        .catch( (error) => {
            console.log( `roolback task ${index} due: ` + error );
        });
    }
}

async function environment(){
    
    contextLetters();
    contextNumbers();    
}

environment();