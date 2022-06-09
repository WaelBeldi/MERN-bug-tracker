// const BGcolor = ["rgba(250, 89, 89, 1)", "rgba(247, 159, 129, 1)", "rgba(245, 218, 129, 1)",
//                  "rgba(87, 204, 153, 0.8)", "rgba(56, 163, 165, 0.8)", "rgba(34, 87, 122, 0.8)"];
const BGcolor = ["rgba(236, 62, 64, 0.8)", "rgba(255, 155, 43, 0.8)", "rgba(245, 216, 0, 0.8)",
                 "rgba(87, 204, 153, 0.8)", "rgba(56, 163, 165, 0.8)", "rgba(34, 87, 122, 0.8)"];

export default function PriorityColors(priority) {
    if(priority === null) 
        return ({
            level : null,
            BGcolor : "rgba(0, 0, 0, 0.8)"
        });
    const level = ["High", "Moderate", "Low", "High", "Moderate", "Low"];
    return ({
        level : level[priority - 1],
        BGcolor : BGcolor[priority - 1],
    })
}
