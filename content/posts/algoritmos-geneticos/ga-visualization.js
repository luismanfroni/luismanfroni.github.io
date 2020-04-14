import React, {useState} from 'react';

import ga, { itens } from "./ga";

import bag from "./rucksack.png";

function InputContainer(props) {
    return <div style={{
        width: '214px',
        marginTop: '12px'
    }}
        {...props} />;
}
function DisplayItem(props) {
    return (
        <img width='64px' height='64px' 
            src={props.img} alt={props.alt} />
    )
}

function DisplayIndividual(props) {
    const [hover, setHover] = useState(false);
    var borderColor = !props.child ? '#6F4F4F' :
       props.child === 'a' ? '#6c3434' : '#503030';
    var bgColor = !props.child ? '#5F2F2F' :
       props.child === 'a' ? '#4a1212' : '#301010';
    const onClick = () => {
        props.change(props.value)
    };
    return (props.value ?
<>
    <div 
    tabindex="0" role="button" aria-pressed="false"
    onClick={onClick}
    onMouseEnter={()=>{
        setHover(true);
        }}
    onMouseLeave={()=>{
        setHover(false);
    }}
    style={{
        flex: 1,
        border: `2px solid ${borderColor}`,
        borderRadius: '6px',
        background: bgColor,
        padding: '12px',
        margin: '12px',
        ...(hover && props.child ? { background: '#555510', cursor: 'pointer' } : {})
    }} >
                <div style={{textAlign: 'center'}}>
                    <DisplayItem img={bag} alt="Mochila" />
                    <br />
                    {  props.value.root ? "Mochila Raiz" :
                       !props.child ? "Mochila" : 
                       `Mochila progenitor ${props.child.toUpperCase()}`
                    }
                    <br />
                    Geração: 
                    { " " + props.value.g.n }
                    <br />
                    Peso: 
                    { " " + props.value.peso }
                    <br />
                    Pontos: 
                    { " " + props.value.pontos }
                </div>
                <div style={{
                    width: '100%',
                    display: 'flex', 
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                }}>
                    {
                    props.value.map((h, i) => 
                        h ? <DisplayItem img={itens[i].img} alt={itens[i].nome} /> : <></>
                    )
                    }
                </div>
    </div>
    {
        !props.child && props.value.a ? <DisplayIndividual value={props.value.a} child="a" ga={props.ga} change={props.change} /> : <></>
    }
    {
        !props.child && props.value.b ? <DisplayIndividual value={props.value.b} child="b" ga={props.ga} change={props.change} /> : <></>
    }
</> : <></>
);
}
export default function GaVisualization(props) {
    const [value, setValue] = useState({
        peso: 30,
        pop: 100,
        gera: 50,
        gens: 6,
        mut: 15,
        config: {},
        current: null,
        mochilaRaiz: null
    });
    const changeVal = (c, v) => {
        setValue({...value, [c]: v});
    }
    const goButton = () => {
        var gaConfigured = ga({
            PESO_MAXIMO: value.peso,
            INDIVIDUOS_POR_POPULACAO: value.pop,
            SELECIONADOS_POR_GERACAO: value.gera,
            GERACOES: value.gens,
            CHANCES_DE_MUTACAO: value.mut
        });
        var gen = gaConfigured.evoluirGeracoes();
        var melhor = gaConfigured.selecionarMelhores(gen)[0];
        melhor.root = true;
        setValue({...value, current: melhor, mochilaRaiz: melhor});
    };
    const backToRoot = () => {
        setValue({...value, current: value.mochilaRaiz});
    };
    const changeBackpack = (backpack) => {
        setValue({...value, current: backpack});
    };
    return (
        <div style={{marginBottom: '22px', background: "#111", padding: '32px', display: 'flex', width: '100%', height: '600px'}}>
            <div style={{width: '216px', margin: 'auto'}}>
                <InputContainer>
                    { value && value.current && !value.current.root ? 
                        <button style={{width: '100%', marginTop: '8px'}} onClick={backToRoot}>Voltar para a Mochila Raiz</button> : <></>
                    }
                </InputContainer>
                <InputContainer>
                    <label htmlFor="peso">Peso máximo</label>
                    <input name="peso" type="number" min="10" 
                        value={value.peso}
                        onChange={ e => changeVal("peso", e.target.value) }
                    ></input>
                </InputContainer>
                <InputContainer>
                    <label htmlFor="pop">Indivíduos por População</label>
                    <input name="pop" type="number" min="10"
                        value={value.pop}
                        onChange={ e => changeVal("pop", e.target.value)}
                    ></input>
                </InputContainer>
                <InputContainer>
                    <label htmlFor="gera">Selecionados por Geração</label>
                    <input name="gera" type="number" min="2"
                        value={value.gera}
                        onChange={ e => changeVal("gera", e.target.value)}
                    ></input>
                </InputContainer>
                <InputContainer>
                    <label htmlFor="gens">Gerações</label>
                    <input name="gens" type="number" min="1"
                        value={value.gens}
                        onChange={ e => changeVal("gens", e.target.value)}
                    ></input>
                </InputContainer>
                <InputContainer>
                    <label htmlFor="mut">% de Mutação</label>
                    <input name="mut" type="number" min="0" max="100"
                        value={value.mut}
                        onChange={ e => changeVal("mut", e.target.value)}
                    ></input>
                </InputContainer>
                <InputContainer>
                    <button style={{width: '100%'}} onClick={goButton}>Gerar GA</button>
                </InputContainer>
            </div>
            <DisplayIndividual value={value.current} ga={ga} change={changeBackpack} />
        </div>
    );
}