({
    render: function (component, helper) {
        const componentMarkup = this.superRender(),
            container = componentMarkup[0],
            progressRing = helper.createProgressRing({
                xmlns: "http://www.w3.org/2000/svg",
                circleSize: component.get("v.size"),
                progress: Math.round(component.get("v.progress")),
                variant: component.get("v.variant")
            });
        container.appendChild(progressRing);
        return componentMarkup;
    },
    rerender: function (component, helper) {
        // Re-write SVG element;
        const container = component.find("container").getElement();
        if (!!container) {
            // Progress ring SVG element goes second after tooltip (if present);
            const progressRing = helper.createProgressRing({
                    xmlns: "http://www.w3.org/2000/svg",
                    circleSize: component.get("v.size"),
                    progress: Math.round(component.get("v.progress")),
                    variant: component.get("v.variant")
                }),
                childIndexToReplace = container.childNodes.length === 2 ? 1 : 0;
            container.replaceChild(progressRing, container.childNodes[childIndexToReplace]);
        }
    }
});