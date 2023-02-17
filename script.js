const camadasDesordem = [
    { inicio: 456, fim: 505 },
    { inicio: 182, fim: 216 },
    { inicio: 469, fim: 523 },
    { inicio: 344, fim: 383 },
    { inicio: 644, fim: 695 },
    { inicio: 1,   fim: 43  },
    { inicio: 23,  fim: 53  },
    { inicio: 721, fim: 760 },
    { inicio: 157, fim: 201 },
    { inicio: 89,  fim: 128 },
    { inicio: 493, fim: 549 },
    { inicio: 568, fim: 610 },
    { inicio: 447, fim: 500 },
    { inicio: 900, fim: 920 },
    { inicio: 891, fim: 931 },
    { inicio: 940, fim: 1000 },
    { inicio: 960, fim: 990 },
    { inicio: 970, fim: 980 },
    { inicio: 975, fim: 977 },
    { inicio: 998, fim: 1005 },
    { inicio: 522, fim: 566 },
    { inicio: 524, fim: 564 },
    { inicio: 534, fim: 554 },
    { inicio: 544, fim: 546 },
    { inicio: 174, fim: 221 },
    { inicio: 698, fim: 750 },
    { inicio: 328, fim: 380 },
    { inicio: 556, fim: 605 },
    { inicio: 764, fim: 809 },
    { inicio: 626, fim: 672 }
]
  

function ordenaCamadas(camadas) {
    camadas = Object.values(camadas)
    const iniciosCamada = {}
    camadas.map(camada => {
        iniciosCamada[camada.inicio] = camada
    })
    return Object.values(iniciosCamada)
}

const camadas = ordenaCamadas(camadasDesordem)

const addIfHasContact = ([head, second, ...tail], acc) => {
    lastLink = acc[acc.length - 1]
    if (!second) {
        lastLink.push(head)
        return repassaCamadas(tail, acc)
    }
    const temLigacao = head.fim > second.inicio
    const taNoMeio = head.fim > second.fim
    if (taNoMeio) {
        lastLink.push(second)
        return addIfHasContact([head, ...tail], acc)
    }
    lastLink.push(head)
    if (temLigacao) {
        return addIfHasContact([second, ...tail], acc)
    }
    else {
        acc.push([])
        return repassaCamadas([second, ...tail], acc)
    }
}

const repassaCamadas = ([head, ...tail], acc) => {
    if (!head) return acc
    return addIfHasContact([head, ...tail], acc)
}  

const mapeiaLinks = ([head, ...tail]) => {
    if (!head) return
    return repassaCamadas([head, ...tail], [[]])
}


const camadasMapeadas = mapeiaLinks(camadas)


const criaLinks = (links) => {
    return links.map(link => {
        const inicio = link[0].inicio
        const final = link[link.length - 1].fim
        return {id: `${inicio}_${final}`, camadasInternas: link}
    })
}


links = criaLinks(camadasMapeadas)

console.log(camadasMapeadas);
console.table(links);