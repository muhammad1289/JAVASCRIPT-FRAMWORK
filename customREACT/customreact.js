function renderELEMENT(container, element) {   // in actual react it has its own DOM , reactDOM which is
                                               //  responsible for rendering the element in the actual DOM
                                               // but here we are doing it customly and redering the element
                                               //  in the actual DOM 
 const createelement = document.createElement(element.type);
 createelement.innerHTML = element.Children;

 for (const prop in element.props) {
    if (prop === 'Children') continue;
    createelement.setAttribute(prop , element.props[prop]);
 }

//  createelement.setAttribute('href' , element.props.href)
//  createelement.setAttribute('target' , element.props.props)
 container.appendChild(createelement);

}


const reactELEMENT = {
    type : "a",
    props : {
        href : "https://www.google.com",
        target : "_blank",
    },
    Children : "click me"
}

const mainContainer = document.querySelector('.root');

renderELEMENT(mainContainer, reactELEMENT);