document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, select');
    const outputField = document.getElementById('outputText');

    function generateRule() {
        //ruleHeaders
        const action = document.getElementById('action').value;
        const protocol = document.getElementById('protocol').value;
        const sourceIP = document.getElementById('sourceIP').value || 'any';
        const sourcePort = document.getElementById('sourcePort').value || 'any';
        const direction = document.getElementById('direction').value;
        const destinationIP = document.getElementById('destinationIP').value || 'any';
        const destinationPort = document.getElementById('destinationPort').value || 'any';
        
        //ruleOptionsGeneral
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

        //ruleOptionsPayload
        const content = document.getElementById('content').value;
        const fast_pattern = document.getElementById('fast_pattern').checked;
        const nocase = document.getElementById('nocase').checked;
        const width = document.getElementById('width').value;
        const endian = document.getElementById('endian').value;
        const offset = document.getElementById('offset').value;
        const depth = document.getElementById('depth').value;
        const distance = document.getElementById('distance').value;
        const within = document.getElementById('within').value;

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

        if (content) {
            rule += `content:"${content}"`;
            if (fast_pattern) rule += ', fast_pattern';
            if (nocase) rule += ', nocase';
            if (width) rule += `, width:${width}`;
            if (endian !== "endian") rule += ` , endian:${endian}`;
            if (offset) rule += `, offset:${offset}`;
            if (depth) rule += `, depth:${depth}`;
            if (distance) rule += `, distance:${distance}`;
            if (within) rule += `, within:${within}`;
            rule += '; ';
        }
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