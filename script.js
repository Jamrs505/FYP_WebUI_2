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

        const bufferlenOperator = document.getElementById('bufferlenOperator').value;
        const bufferlen = document.getElementById('bufferlen').value;
        const bufferlenStart = document.getElementById('bufferlenStart').value;
        const bufferlenRelative = document.getElementById('bufferlenRelative').checked;

        const isdataatNotOperator = document.getElementById('isdataatNotOperator').checked;
        const isdataat = document.getElementById('isdataat').value;
        const isdataatRelative = document.getElementById('isdataatRelative').checked;

        const dsizeOperator = document.getElementById('dsizeOperator').value;
        const dsize = document.getElementById('dsize').value;
        const dsizeStart = document.getElementById('dsizeStart').value;

        const pcre = document.getElementById('pcre').value;
        const pcreFast_pattern = document.getElementById('pcreFast_pattern').checked;
        const pcreNocase = document.getElementById('pcreNocase').checked;



        let rule = `${action} ${protocol} ${sourceIP} ${sourcePort} ${direction} ${destinationIP} ${destinationPort} (`;

        if (ruleMessage) rule += `msg:"${ruleMessage}"; `;

        if ((reference !== "Reference") && referenceText) rule += `reference:${reference},${referenceText}; `;
        if (gid) rule += `gid:${gid}; `;
        if (sid) rule += `sid:${sid}; `;
        if (rev) rule += `rev:${rev}; `;
        if (classtype !== "Classtype") rule += `classtype:${classtype}; `;
        if (priority) rule += `priority:${priority}; `;
        if (metadata) rule += `metadata:${metadata}; `;
        if (service) rule += `service:${service}; `;
        if (rem) rule += `rem:"${rem}"; `;

        //Content options
        if (content) {
            if (isdataat) {
                rule += `isdataat:${isdataat}`;
                if (isdataatRelative) rule += `,relative `;
                rule += '; ';
            }

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

            if (bufferlen) {
                if (bufferlenOperator === '<>' || bufferlenOperator === '<=>') {
                    rule += `bufferlen:${bufferlenStart}${bufferlenOperator}${bufferlen}`;
                }
                else {
                    rule += `bufferlen:${bufferlen}`;
                }
                if (bufferlenRelative) rule += `,relative`;
                rule += '; ';
            }

            if (dsize) {
                if (dsizeOperator === '<>' || dsizeOperator === '<=>') {
                    rule += `dsize:${dsizeStart}${dsizeOperator}${dsize}`;
                }
                else {
                    rule += `dsize:${dsize}`;
                }
                if (dsizeRelative) rule += `,relative`;
                rule += '; ';
            }

        }
        
        if (pcre) {
                rule += `pcre:"${pcre}"`;
                if (pcreFast_pattern) rule += ', fast_pattern';
                if (pcreNocase) rule += ', nocase';
                rule += '; ';
            }

        rule += ')';

        if (action === 'Action' || protocol === 'Protocol') {
            outputField.value = ''; // Clear output if essential fields are not selected
        } else {
            outputField.value = rule;
        }


        // Hide or show bufferlenStart based on bufferlen operator
        if (bufferlenOperator == '<>' || bufferlenOperator == '<=>') {
            document.getElementById('bufferlenStart').hidden = false;
        } else {
            document.getElementById('bufferlenStart').hidden = true;
        }

        // Hide or show dsizeStart based on dsize operator
        if (dsizeOperator == '<>' || dsizeOperator == '<=>') {
            document.getElementById('dsizeStart').hidden = false;
        } else {
            document.getElementById('dsizeStart').hidden = true;
        }

    }

    inputs.forEach(input => {
        input.addEventListener('input', generateRule);
    });
});