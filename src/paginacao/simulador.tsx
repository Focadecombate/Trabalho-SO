import { useState } from "react";

export default function Simulador() {

    const [teste, setTeste] = useState('SIMULADOR CONTROLLER');
    const [simulando, setSimulando] = useState(false);
    const [algoritmo, setAlgoritmo] = useState(null);
    const [algoritmoNome, setAlgoritmoNome] = useState('');
    const [numQuadros, setNumQuadros] = useState(0);
    const [referenciasOriginais, setReferenciasOriginais] = useState([]);
    const [referenciasRestantes, setReferenciasRestantes] = useState([]);
    const [memoria, setMemoria] = useState<any[]>([]);
    const [passo, setPasso] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [quadroAtual, setQuadroAtual] = useState(0);


    function defineParametros(params: any){
        setSimulando(true);
        setAlgoritmo(params.algoritmo);
        setNumQuadros(params.numQuadros);
        setReferenciasOriginais(params.referencias.slice(0));
        setReferenciasRestantes(params.referencias.slice(0));
    }

    function zerar(){
        setSimulando(false);
        setPasso(0);
        setAcertos(0);
        setAlgoritmo(null);
        setNumQuadros(0);
        setReferenciasOriginais([]);
        setReferenciasRestantes([]);
        setMemoria([]);
        setQuadroAtual(0);
        // $scope.$parent.$broadcast('zerar', ''); 
    }

    function avancar(){
        if(algoritmo =='1') {
            simulaFIFO();
        } else {
            simulaLRU();
        }
    }

    function simulaFIFO(){
        let memoriaModificada = [...memoria];
        let referenciasRestantesModificada = [...referenciasRestantes];

        setAlgoritmoNome('First In First Out (FIFO)');
        if(memoria.indexOf(referenciasOriginais[passo]) == -1){
            memoriaModificada[quadroAtual] = referenciasOriginais[passo];
            setMemoria(memoriaModificada);
            (quadroAtual < numQuadros - 1) ? (setQuadroAtual(quadroAtual + 1)) : (setQuadroAtual(0));

        } else {
            setAcertos(acertos + 1);
        }

        setPasso(passo + 1);
        referenciasRestantesModificada.shift();
        setReferenciasRestantes(referenciasRestantes);
    }

    function simulaLRU(){
        let memoriaModificada = [...memoria];
        let referenciasRestantesModificada = [...referenciasRestantes];

        setAlgoritmoNome('Least Recently Used (LRU)');
        let hit = false;
        let pos = 0;
        memoriaModificada.forEach((quadro,indice) => {
            if (!hit && quadro.pagina == referenciasOriginais[passo]){
                hit = true;
                pos = indice;
            }
        });

        if(hit){
            memoriaModificada[pos].tempo = passo;
            setAcertos(acertos + 1);
        } else {
            let quadro = {
                pagina: referenciasOriginais[passo],
                tempo: passo
            }
            if(memoriaModificada.length < numQuadros){
                pos = memoriaModificada.length;
            } else {
                let tempo = passo;
                memoriaModificada.forEach((quadro, indice) => {
                    if(quadro.tempo < tempo) {
                        tempo = quadro.tempo;
                        pos = indice;
                    }
                });

            }
            memoriaModificada[pos] = quadro;
            setMemoria(memoriaModificada);
        }
        setPasso(passo + 1);
        referenciasRestantesModificada.shift;
        setReferenciasRestantes(referenciasRestantesModificada);
    }

        

}
