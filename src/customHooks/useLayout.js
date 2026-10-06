import React , {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';

function Mycomp1(){

    let mes1 = useRef();
    let mes2 = useRef();
    let text1 = useRef();
    let text2 = useRef();

    console.log(mes1);
    console.log(mes2);

    console.log("start");

    useEffect(()=>{
        console.log('a');
        
    })

    useLayoutEffect(()=>{
        console.log('b');
        mes1.current.style.display = 'none'
        mes2.current.style.display = 'none'
    })

    console.log("end");

    function myfunc(){
        let data1 = text1.current.value;
        let data2 = text1.current.value;

        if(data1=="")
        {
            mes1.current.style.display = 'inline-block'
        }
        else{
            mes1.current.style.display = 'none'
        }

        if(data2==""){
            mes2.current.style.display = 'inline-block'
        }
        else{
            mes2.current.style.display = 'none'
        }

        if(data1!="" && data2!=""){
            fetch('https://dummyjson.com/auth/login', {
                method:"post",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    username:data1, password:data2
                })
            })
            .then(res=>res.json())
            .then(value=>{
                console.log(value);
            })
            .catch(error=>{
                console.error('Error during login:', error);
            });
        }
    }
    
    
    
    
    return(
        <Container>
            <h1>useEffect useLayoutEffect Hook</h1>
            <input type="text" ref={text1} /><span ref={mes1}>Require Email</span><br/>
            <input type="text" ref={text2} /><span ref={mes2}>Require Password</span><br/>

            <button onClick={myfunc}>Login</button>
        </Container>
    )
}

export default Mycomp1;