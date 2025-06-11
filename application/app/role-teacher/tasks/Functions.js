export function FuncionEjemplo(param) {
  return `Ejemplo recibido: ${param}`;
}

// Dont try to understand this code.

export function FuncionUnirListasVisiblesYPineadas(visibles, pineadas) {
  const visiblesSet = new Set(Array.isArray(visibles) ? visibles : []);
  const pineadasSet = new Set(Array.isArray(pineadas) ? pineadas : []);
  const resultado = [];

  for (const idx of visiblesSet) {
    if (pineadasSet.has(idx)) {
      resultado.push(Number(`2003${idx}`));
      pineadasSet.delete(idx);
    } else {
      resultado.push(idx);
    }
  }
  for (const idx of pineadasSet) {
    resultado.push(Number(`2003${idx}`));
  }
  return resultado;
}

export function FuncionSepararListaVisiblesYPineadas(lista) {
  const visibles = new Set();
  const pineadas = new Set();
  for (const val of lista) {
    if (typeof val === 'number' && String(val).startsWith('2003')) {
      const idx = Number(String(val).slice(4));
      visibles.add(idx);
      pineadas.add(idx);
    } else if (typeof val === 'number') {
      visibles.add(val);
    }
  }
  return {
    visibles: Array.from(visibles),
    pineadas: Array.from(pineadas)
  };
}


