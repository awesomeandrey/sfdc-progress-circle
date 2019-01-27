({
    createProgressRing: function (params) {
        const {xmlns, circleSize, progress, variant = "brand"} = params,
            svgElement = this.createSvg(xmlns, circleSize);

        // Circle group;
        const circleGroup = this.createGroupTag(xmlns, "progress-circle"),
            defaultCircle = this.createCircle(xmlns, ["circle__default", variant].join(" "), circleSize),
            progressCircle = this.createCircle(xmlns, "circle__progress", circleSize);
        progressCircle.setAttributeNS(null, "stroke-dashoffset", -(Math.round(125 * progress / 100)));
        circleGroup.appendChild(defaultCircle);
        circleGroup.appendChild(progressCircle);

        // Legend group;
        const textGroup = this.createGroupTag(xmlns), text = this.createText(xmlns, progress + "%");
        textGroup.appendChild(text);

        svgElement.appendChild(circleGroup);
        svgElement.appendChild(textGroup);
        return svgElement;
    },
    createSvg: function (xmlns, size) {
        const svg = document.createElementNS(xmlns, "svg");
        svg.setAttributeNS(null, "width", size + "rem");
        svg.setAttributeNS(null, "height", size + "rem");
        return svg;
    },
    createGroupTag: function (xmlns, className) {
        const gTag = document.createElementNS(xmlns, "g");
        gTag.setAttributeNS(null, "class", className);
        return gTag;
    },
    createCircle: function (xmlns, className, size) {
        const circle = document.createElementNS(xmlns, "circle");
        circle.setAttributeNS(null, "cx", (size / 2).toFixed(2) + "rem");
        circle.setAttributeNS(null, "cy", (size / 2).toFixed(2) + "rem");
        circle.setAttributeNS(null, "r", (size * 0.35).toFixed(2) + "rem");
        circle.setAttributeNS(null, "fill", "none");
        circle.setAttributeNS(null, "stroke-width", (size * 0.06).toFixed(2) + "rem");
        circle.setAttributeNS(null, "class", className);
        return circle;
    },
    createText: function (xmlns, val) {
        const text = document.createElementNS(xmlns, "text");
        text.setAttributeNS(null, "x", "50%");
        text.setAttributeNS(null, "y", "50%");
        text.setAttributeNS(null, "stroke", "#5c5c5c");
        text.setAttributeNS(null, "text-anchor", "middle");
        text.setAttributeNS(null, "stroke-width", "0");
        text.setAttributeNS(null, "dy", ".3em");
        text.setAttributeNS(null, "font-size", ".8rem");
        text.innerHTML = val;
        return text;
    }
});