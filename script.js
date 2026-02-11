document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');
    const outputField = document.getElementById('outputText');

    function generateRule() {
        const action = document.getElementById('action').value;
        const protocol = document.getElementById('protocol').value;
        const sourceIP = document.getElementById('sourceIP').value || 'any';
        const sourcePort = document.getElementById('sourcePort').value || 'any';
        const direction = document.getElementById('direction').value;
        const destinationIP = document.getElementById('destinationIP').value || 'any';
        const destinationPort = document.getElementById('destinationPort').value || 'any';
        
        //Put additional variables here for other options
        const ruleMessage = document.getElementById('msg').value;

        const reference = document.getElementById('reference').value;
        const referenceText = document.getElementById('referenceText').value;

        const gid = document.getElementById('gid').value;
        const sid = document.getElementById('sid').value;
        const rev = document.getElementById('rev').value;
        const classtype = document.getElementById('classtype').value;
        const priority = document.getElementById('priority').value;
        const metadata = document.getElementById('metadata').value;
        const service = document.getElementById('service').value;
        const rem = document.getElementById('rem').value;

        let rule = `${action} ${protocol} ${sourceIP} ${sourcePort} ${direction} ${destinationIP} ${destinationPort} (`;

        if (ruleMessage) rule += `msg:"${ruleMessage}"; `;

        if (reference && referenceText) rule += `reference:${reference},${referenceText}; `;
        if (gid) rule += `gid:${gid}; `;
        if (sid) rule += `sid:${sid}; `;
        if (rev) rule += `rev:${rev}; `;
        if (classtype !== "Classtype") rule += `classtype:${classtype}; `;
        if (priority) rule += `priority:${priority}; `;
        if (metadata) rule += `metadata:${metadata}; `;
        if (service) rule += `service:${service}; `;
        if (rem) rule += `rem:"${rem}"; `;

        // Put rule logic here for additional options

        rule += ')';

        console.log(action) //Testing
        console.log(protocol) //Testing
        if (action === 'Action' || protocol === 'Protocol') {
            outputField.value = ''; // Clear output if essential fields are not selected
        } else {
        outputField.value = rule; }
    }



    inputs.forEach(input => {
        input.addEventListener('input', generateRule);
    });
});