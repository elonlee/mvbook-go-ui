let index = {
    about: function(html) {
        let c = document.createElement("div");
        c.innerHTML = html;
        asticode.modaler.setContent(c);
        asticode.modaler.show();
    },
    addFolder(name, path) {
        let div = document.createElement("div");
        div.className = "dir";
        div.onclick = function() { index.explore(path) };
        div.innerHTML = `<i class="fa fa-folder"></i><span>` + name + `</span>`;
        document.getElementById("dirs").appendChild(div)
    },
    init: function() {
        // Init
        console.log("init");
        asticode.loader.init();
        asticode.modaler.init();
        asticode.notifier.init();

        // Wait for astilectron to be ready
        document.addEventListener('astilectron-ready', function() {
            // Listen
            index.listen();

            // Explore default path
            index.readimg();
        });

        $('#files_panel').magnificPopup({
            delegate: 'a.zoomimg',
            type: 'image',
            mainClass: 'mfp-with-zoom mfp-img-mobile'
        });

    },
    readimg: function(path) {
        // Create message
        let message = {"name": "readimg"};
        if (typeof path !== "undefined") {
            message.payload = path
        }
console.log(message);
        // Send message
        // asticode.loader.show();
        astilectron.sendMessage(message, function(message) {
            // Init
            // asticode.loader.hide();
            console.log(message)
            // Check error
            if (message.name === "error") {
                asticode.notifier.error(message.payload);
                return
            }

            // Process path
            $("#files_panel").html("<a class=\"zoomimg\" href=\""+message.payload.limg+"\"> <img class='zoomimg' src='"+ message.payload.simg+"'></a>");

        })
    },
    listen: function() {
        astilectron.onMessage(function(message) {
            switch (message.name) {
                case "about":
                    index.about(message.payload);
                    return {payload: "payload"};
                    break;
                case "check.out.menu":
                    asticode.notifier.info(message.payload);
                    break;
            }
        });
    }
};