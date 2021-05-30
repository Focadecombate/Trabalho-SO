import { useState } from "react";

export default function AplicacaoController() {
    const [erro, setErro] = useState(false);
    const [simulando, setSimulando] = useState(false);
    const [numQuadros, setnumQuadros] = useState(0);
    const [algoritmo, setAlgoritmo] = useState(0);
    const [stringReferencias, setStringReferencias] = useState('');
    const [referencias, setReferencias] = useState([]);

    function simular() {
        if (parametrosCorretos()) {
            erro = false;
            simulando = true;
            var params = {
                algoritmo: algoritmo,
                numQuadros: numQuadros,
                referencias: referencias
            };
            if (algoritmo == '1') {
                // $parent.$broadcast('fifo', params);
                console.log('Executando FIFO')
            } else {
                   // $parent.$broadcast('lru', params);
                   console.log('Executando LRU')
            }
        }
    }
    
    function parametrosCorretos() {
        var corretude = false;
        if (numQuadros && algoritmo && stringReferencias) {
            obtemReferencias();
            corretude = true;
        } else {
            erro = true;
        }
        return corretude;
    }

     function fifo(params: any){
       defineParametros(params);
       simulaFIFO();
    }; 

    return <h1> Hello World </h1>

} 

 