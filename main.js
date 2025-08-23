console.log("Go");

const containerList = document.querySelector(".container-list")

let antique = JSON.parse(localStorage.getItem("antique")) || [
    {
        desc: "Broche tembladera del siglo XVIII, oro esmalte y esmeraldas. Madrid, museo arqueológico",
        image: "img/broche-tembladera-oro-esmalte-esmeraldas-siglo-xviii.jpg"
    },
    {
        desc: "Colgante en girandolé de esmeraldas y diamantes con engaste embutido en oro  y plata, probablemente realizado en España hacia mediados del siglo XVIII.",
        image: "img/colgante-girandole-esmeraldas-diamantes-siglo-xviii.jpg"
    },
    {
        desc: "Anverso y reverso siglo XVIII. Es muy importante ver la parte de atrás de una joya, siempre hay que darle la vuelta. ",
        image: "img/anverso-y-reverso-siglo-xviii.jpg"
    },
    {
        desc: "Sevigné española, 1 ª mitad siglo XVIII en oro y esmeraldas",
        image: "img/sevigne-espanola-en-oro-y-esmeraldas-siglo-xviii.jpg"
    }

];