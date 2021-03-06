/* Magic Mirror
 * Module: MMM-Bored
 *
 * By cowboysdude
 *
 */
Module.register("MMM-Bored", {

    defaults: {
        updateInterval: 60 * 60 * 1000,
        animationSpeed: 1000,
        initialLoadDelay: 875 
    },

    getStyles: function() {
        return ["MMM-Bored.css"];
    },

     getTranslations: function() {
        return {
            en: "translations/en.json",
            da: "translations/da.json",
            sv: "translations/sv.json",
            de: "translations/de.json",
            es: "translations/es.json",
            fr: "translations/fr.json",
            zh_cn: "translations/zh_cn.json",
            nl: "translations/nl.json",
            nb: "translations/nb.json",
	        ar: "translations/ar.json"
        } 
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);
        this.config.lang = this.config.lang || config.language;
		this.sendSocketNotification("CONFIG", this.config);

        // Set locale.
        this.today = "";
        this.scheduleUpdate();
    },


    getDom: function() { 
        var fact = this.fact;


        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth; 

        var top = document.createElement("div");


        var title = document.createElement("div");
        title.classList.add("xsmall", "bright", "title");
        title.innerHTML = this.translate("Bored?");
        top.appendChild(title);

        var des = document.createElement("div");
        des.classList.add("small", "bright", "description");
        des.innerHTML = fact;
        top.appendChild(des);

        wrapper.appendChild(top);
        return wrapper;

    },

    processFacts: function(data) {
        this.fact = data;
        this.loaded = true;
        this.updateDom(this.config.animationSpeed);
    },

    scheduleUpdate: function() {
        setInterval(() => {
            this.getFact();
        }, this.config.updateInterval);
        this.getFact(this.config.initialLoadDelay);
    },

    getFact: function() {
        this.sendSocketNotification('GET_FACT');
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "FACT_RESULT") {
            this.processFacts(payload);
        }
        this.updateDom(this.config.initialLoadDelay);
    },

});
