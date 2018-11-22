const getRef = (id) => {
    let ref = firebase.database().ref();
    let hash = id;
    if (hash) {
        ref = ref.child(hash);
    } else {
        ref = ref.push();
    }
    return ref;
}
const init = (id) => {
    //// Initialize Firebase.
    //// TODO: replace with your Firebase project configuration.
    const config = {
        apiKey: "AIzaSyBwE1qR498n4ztDey491qeCypaQ7DRxNCw",
        authDomain: "helpi-6e932.firebaseapp.com",
        databaseURL: "https://helpi-6e932.firebaseio.com",
        projectId: "helpi-6e932",
        storageBucket: "helpi-6e932.appspot.com",
        messagingSenderId: "919481448944"
    };
    firebase.initializeApp(config);
    let firepadRef = getRef(id);
    let codeMirror = CodeMirror(document.getElementById('firepad-container'), {lineWrapping: true});
    let firepad = Firepad.fromCodeMirror(firepadRef, codeMirror,
        {richTextToolbar: true, richTextShortcuts: true});
    firepad.on('ready',  () => {
        if (firepad.isHistoryEmpty()) {
            firepad.setHtml('')
        }
    });
    firepad.registerEntity('checkbox', {
        render: function (info, entityHandler) {
            let inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'checkbox');
            if (info.checked) {
                inputElement.checked = 'checked';
            }
            inputElement.addEventListener('click', function () {
                entityHandler.replace({checked: this.checked});
            });
            return inputElement;
        }.bind(this),
        fromElement: function (element) {
            let info = {};
            if (element.hasAttribute('checked')) {
                info.checked = true;
            }
            return info;
        },
        update: function (info, element) {
            if (info.checked) {
                element.checked = 'checked';
            } else {
                element.checked = null;
            }
        },
        export: function (info) {
            let inputElement = document.createElement('checkbox');
            if (info.checked) {
                inputElement.setAttribute('checked', true);
            }
            return inputElement;
        }
    });
}