import { useEffect } from 'react';

const WhatsAppWidget = () => {
    useEffect(() => {
        (function () {
            var options = {
                whatsapp: "+966542183024", 
                whatsapp_agent_image_1: "https://static.getbutton.io/img/flag.jpg?v=1", 
                whatsapp_agent_image_2: "https://static.getbutton.io/img/flag.jpg?v=1", 
                whatsapp_agent_image_3: "https://static.getbutton.io/img/flag.jpg?v=1", 
                whatsapp_agent_image_4: "https://static.getbutton.io/img/flag.jpg?v=1", 
                whatsapp_agent_image_5: "https://static.getbutton.io/img/flag.jpg?v=1", 
                whatsapp_popup_title: "Start a Conversation", 
                whatsapp_popup_subtitle: "Click one of our members below to chat",
                call_to_action: "جاهزين لخدمتك", 
                ga: true, 
                button_opacity: 50, 
                shift_vertical: 40, 
                domain: "moyhstation.shop", 
                key: "KndjOLhhRrui5JLFfhVutg", 
            };
            var proto = 'https:', host = "getbutton.io", url = proto + '//static.' + host;
            var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
            s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
            var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
        })();
    }, []);

    return null; // This component doesn't render anything, it just loads the script
}

export default WhatsAppWidget;
