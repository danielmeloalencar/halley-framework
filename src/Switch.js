import Halley, { render } from "./index"



export const Case = ({ children }) => children

export const Default = ({ children }) => children

export const Switch = ({ children, on }) => {

  let filhos = [];
  let padrao = null;
  if (Array.isArray(children)) {

    /**Percorre cada elemento */
    children.map(child => {
        if (child.type === Case) {
        if (child.props.is === on) {
          filhos.push(child)
        }
      }

      if (child.type === Default) {
        padrao = child
      }

    })
  } 

  
  if (filhos.length > 0)
    return filhos
  else if (padrao) return padrao
  else if (children) return children 
  else return ""
}

