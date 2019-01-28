({
    xmlns: "http://www.w3.org/2000/svg",
    createProgressRing: function (params) {
        const {size, progress, variant = "brand"} = params,
            svgElement = this.createSvg(size);

        // Circle group;
        const circleGroup = this.createGroupTag("progress-circle"),
            defaultCircle = this.createCircle(["circle__default", variant].join(" "), size),
            progressCircle = this.createCircle("circle__progress", size);
        progressCircle.setAttributeNS(null, "stroke-dashoffset", -(Math.round(125 * progress / 100)));
        circleGroup.appendChild(defaultCircle);
        circleGroup.appendChild(progressCircle);

        // Legend group;
        const textGroup = this.createGroupTag(), text = this.createText(progress + "%");
        textGroup.appendChild(text);

        svgElement.appendChild(circleGroup);
        svgElement.appendChild(textGroup);
        return svgElement;
    },
    createSvg: function (size) {
        const svg = document.createElementNS(this.xmlns, "svg");
        svg.setAttributeNS(null, "class", size);
        return svg;
    },
    createGroupTag: function (className) {
        const gTag = document.createElementNS(this.xmlns, "g");
        gTag.setAttributeNS(null, "class", className || "");
        return gTag;
    },
    createCircle: function (className, size) {
        const circle = document.createElementNS(this.xmlns, "circle");
        circle.setAttributeNS(null, "class", className || "");
        return circle;
    },
    createText: function (val) {
        const text = document.createElementNS(this.xmlns, "text");
        text.setAttributeNS(null, "x", "50%");
        text.setAttributeNS(null, "y", "50%");
        text.setAttributeNS(null, "text-anchor", "middle");
        text.setAttributeNS(null, "dy", "0.32em");
        text.innerHTML = val;
        return text;
    }
});