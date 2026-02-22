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
        const service = document.getElementById('service').value;

        //ruleOptionsPayload
        const content = document.getElementById('content').value;
        const fast_pattern = document.getElementById('fast_pattern').checked;
        const nocase = document.getElementById('nocase').checked;
        const offset = document.getElementById('offset').value;
        const depth = document.getElementById('depth').value;

        const dsizeOperator = document.getElementById('dsizeOperator').value;
        const dsize = document.getElementById('dsize').value;
        const dsizeStart = document.getElementById('dsizeStart').value;

        const ttlOperator = document.getElementById('ttlOperator').value;
        const ttl = document.getElementById('ttl').value;
        const ttlStart = document.getElementById('ttlStart').value;

        const ip_protoOperator = document.getElementById('ip_protoOperator').value;
        const ip_proto = document.getElementById('ip_proto').value;
        const ip_protoStart = document.getElementById('ip_protoStart').value;

        const itypeOperator = document.getElementById('itypeOperator').value;
        const itype = document.getElementById('itype').value;
        const itypeStart = document.getElementById('itypeStart').value;

        const icodeOperator = document.getElementById('icodeOperator').value;
        const icode = document.getElementById('icode').value;
        const icodeStart = document.getElementById('icodeStart').value;

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
        if (service) rule += `service:${service}; `;

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

        //Clear output if essential fields are not selected
        if (action === 'Action' || protocol === 'Protocol') {
            outputField.value = '';
        } else {
            outputField.value = rule;
        }

        //Hide or show dsizeStart based on dsize operator
        if (dsizeOperator == '<>' || dsizeOperator == '<=>') {
            document.getElementById('dsizeStart').hidden = false;
        } else {
            document.getElementById('dsizeStart').hidden = true;
        }

        //Hide or show ttlStart based on ttl operator
        if (ttlOperator == '<>' || ttlOperator == '<=>') {
            document.getElementById('ttlStart').hidden = false;
        } else {
            document.getElementById('ttlStart').hidden = true;
        }

        //Hide or show ip_protoStart based on ip_proto operator
        if (ip_protoOperator == '<>' || ip_protoOperator == '<=>') {
            document.getElementById('ip_protoStart').hidden = false;
        } else {
            document.getElementById('ip_protoStart').hidden = true;
        }

        //Hide or show itypeStart based on itype operator
        if (itypeOperator == '<>' || itypeOperator == '<=>') {
            document.getElementById('itypeStart').hidden = false;
        } else {
            document.getElementById('itypeStart').hidden = true;
        }

        //Hide or show icodeStart based on icode operator
        if (icodeOperator == '<>' || icodeOperator == '<=>') {
            document.getElementById('icodeStart').hidden = false;
        } else {
            document.getElementById('icodeStart').hidden = true;
        }


        //Hide or shown protcol specific options based on protocol selection
        console.log(protocol); //Testing
        if (protocol !== 'Protocol') {
            document.getElementById('protocolSpecificOptions').hidden = false;
            document.getElementById('protocolSpecificOptions').style.border = '1px solid #888888';
            document.getElementById('protocolSpecificOptions').style.marginBottom = '20px';
            if (protocol === 'ip') {
                document.getElementById('ipOptions').hidden = false;
                document.getElementById('tcpOptions').hidden = true;
                document.getElementById('udpOptions').hidden = true;
                document.getElementById('icmpOptions').hidden = true;
            } else if (protocol === 'tcp') {
                document.getElementById('ipOptions').hidden = true;
                document.getElementById('tcpOptions').hidden = false;
                document.getElementById('udpOptions').hidden = true;
                document.getElementById('icmpOptions').hidden = true;
            } else if (protocol === 'udp') {
                document.getElementById('ipOptions').hidden = true;
                document.getElementById('tcpOptions').hidden = true;
                document.getElementById('udpOptions').hidden = false;
                document.getElementById('icmpOptions').hidden = true;
            } else if (protocol === 'icmp') {
                document.getElementById('ipOptions').hidden = true;
                document.getElementById('tcpOptions').hidden = true;
                document.getElementById('udpOptions').hidden = true;
                document.getElementById('icmpOptions').hidden = false;
            }
        } else {
            document.getElementById('protocolSpecificOptions').hidden = true;
            document.getElementById('ipOptions').hidden = true;
            document.getElementById('tcpOptions').hidden = true;
            document.getElementById('udpOptions').hidden = true;
            document.getElementById('icmpOptions').hidden = true;
            document.getElementById('protocolSpecificOptions').style.border = 'none';
            document.getElementById('protocolSpecificOptions').style.marginBottom = '0px';
        }
    }

    inputs.forEach(input => {
        input.addEventListener('input', generateRule);
    });
});