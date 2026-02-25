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

        //Content options
        const content = document.getElementById('content').value;
        const fast_pattern = document.getElementById('fast_pattern').checked;
        const nocase = document.getElementById('nocase').checked;
        const offset = document.getElementById('offset').value;
        const depth = document.getElementById('depth').value;
        const http_uri = document.getElementById('http_uri').checked;

        //Rexex options
        const pcre = document.getElementById('pcre').value;
        const pcreFlagi = document.getElementById('pcreFlagi').checked;
        const pcreFlags = document.getElementById('pcreFlags').checked;
        const pcreFlagm = document.getElementById('pcreFlagm').checked;
        const pcreFlagx = document.getElementById('pcreFlagx').checked;
        const pcreFlagA = document.getElementById('pcreFlagA').checked;
        const pcreFlagE = document.getElementById('pcreFlagE').checked;
        const pcreFlagG = document.getElementById('pcreFlagG').checked;
        const pcreFlagO = document.getElementById('pcreFlagO').checked;
        const pcreFlagR = document.getElementById('pcreFlagR').checked;

        const dsizeOperator = document.getElementById('dsizeOperator').value;
        const dsize = document.getElementById('dsize').value;
        const dsizeStart = document.getElementById('dsizeStart').value;

        const ttlOperator = document.getElementById('ttlOperator').value;
        const ttl = document.getElementById('ttl').value;
        const ttlStart = document.getElementById('ttlStart').value;

        const ip_protoOperator = document.getElementById('ip_protoOperator').value;
        const ip_proto = document.getElementById('ip_proto').value;

        const itypeOperator = document.getElementById('itypeOperator').value;
        const itype = document.getElementById('itype').value;
        const itypeStart = document.getElementById('itypeStart').value;

        const icodeOperator = document.getElementById('icodeOperator').value;
        const icode = document.getElementById('icode').value;
        const icodeStart = document.getElementById('icodeStart').value;

        const http_method = document.getElementById('http_method').value;
        const http_stat_code = document.getElementById('http_stat_code').value;
        

        const flag0 = document.getElementById('flag0').checked;
        if (flag0) {
            document.getElementById('flagFIN').checked = false;
            document.getElementById('flagSYN').checked = false;
            document.getElementById('flagRST').checked = false;
            document.getElementById('flagPSH').checked = false;
            document.getElementById('flagACK').checked = false;
            document.getElementById('flagURG').checked = false;
            document.getElementById('flagCWR').checked = false;
            document.getElementById('flagECE').checked = false;
        }

        const flagFIN = document.getElementById('flagFIN').checked;
        const flagSYN = document.getElementById('flagSYN').checked;
        const flagRST = document.getElementById('flagRST').checked;
        const flagPSH = document.getElementById('flagPSH').checked;
        const flagACK = document.getElementById('flagACK').checked;
        const flagURG = document.getElementById('flagURG').checked;
        const flagCWR = document.getElementById('flagCWR').checked;
        const flagECE = document.getElementById('flagECE').checked;
        const flagPlus = document.getElementById('flag+').checked;
        const flagStar = document.getElementById('flag*').checked;
        const flagNot = document.getElementById('flag!').checked;
        

        const flowState = document.getElementById('flowState').value;
        const flowDirection = document.getElementById('flowDirection').value;

        const flowDirectionUDP = document.getElementById('flowDirectionUDP').value;

        const detection_filterTrack = document.getElementById('detection_filterTrack').value;
        const detection_filterCount = document.getElementById('detection_filterCount').value;
        const detection_filterSeconds = document.getElementById('detection_filterSeconds').value;


        //Needed options
        let rule = `${action} ${protocol} ${sourceIP} ${sourcePort} ${direction} ${destinationIP} ${destinationPort} (`;

        //Basic options
        if (rev) rule += `rev:${rev}; `;
        if (sid) rule += `sid:${sid}; `;
        if (ruleMessage) rule += `msg:"${ruleMessage}"; `;
        if (classtype !== "Classtype") rule += `classtype:${classtype}; `;
        if (priority) rule += `priority:${priority}; `;
        if (gid) rule += `gid:${gid}; `;

        //Protocol specific options
        //IP options
        if (ttl) {
            if (ttlOperator === '<>' || ttlOperator === '<=>') {
                rule += `ttl:${ttlStart}${ttlOperator}${ttl}`;
            }
            else {
                if (ttlOperator === '=') rule += `ttl:${ttl}`;
                else if (ttlOperator === 'TTL') rule += `ttl:${ttl}`;
                else rule += `ttl:${ttlOperator}${ttl}`;
            }
            rule += '; ';
        }

        if (ip_proto) {
            if (ip_protoOperator === '=') rule += `ip_proto:${ip_proto}`;
                else if (ip_protoOperator === 'IP Protocol') rule += `ip_proto:${ip_proto}`;
                else rule += `ip_proto:${ip_protoOperator}${ip_proto}`;
                rule += '; ';
            }
        
        //ICMP options
        if (itype) {
            if (itypeOperator === '<>' || itypeOperator === '<=>') {
                rule += `itype:${itypeStart}${itypeOperator}${itype}`;
            }
            else {
                if (itypeOperator === '=') rule += `itype:${itype}`;
                else if (itypeOperator === 'ICMP Type') rule += `itype:${itype}`;
                else rule += `itype:${itypeOperator}${itype}`;
            }
            rule += '; ';
        }

        if (icode) {
            if (icodeOperator === '<>' || icodeOperator === '<=>') {
                rule += `icode:${icodeStart}${icodeOperator}${icode}`;
            }
            else {
                if (icodeOperator === '=') rule += `icode:${icode}`;
                else if (icodeOperator === 'ICMP Code') rule += `icode:${icode}`;
                else rule += `icode:${icodeOperator}${icode}`;
            }
            rule += '; ';
        }

        //TCP options
        if (http_method !== 'HTTP Method') rule += `http_method; content:"${http_method}"; `;
        if (http_stat_code !== 'HTTP Status Code') rule += `http_stat_code; content:"${http_stat_code}"; `;
        if (flagFIN || flagSYN || flagRST || flagPSH || flagACK || flagURG || flagCWR || flagECE || flag0) {
            rule += 'flags:';
            if (flagPlus) rule += '+';
            if (flagStar) rule += '*';
            if (flagNot) rule += '!';
            if (flagFIN) rule += 'F';
            if (flagSYN) rule += 'S';
            if (flagRST) rule += 'R';
            if (flagPSH) rule += 'P';
            if (flagACK) rule += 'A';
            if (flagURG) rule += 'U';
            if (flagCWR) rule += 'C';
            if (flagECE) rule += 'E';
            if (flag0) rule += '0';
            rule += '; ';
        }
        if (flowState !== 'Flow State' || flowDirection !== 'Flow Direction') {
            if (flowState === 'Flow State') rule += `flow:${flowDirection}; `;
            else if (flowDirection === 'Flow Direction') rule += `flow:${flowState}; `;
            else rule += `flow:${flowState},${flowDirection}; `;
        }

        
        //UDP options
        if (flowDirectionUDP !== 'Flow Direction') rule += `flow:${flowDirectionUDP}; `;

        
        //General options
        if (dsize) {
            if (dsizeOperator === '<>' || dsizeOperator === '<=>') {
                rule += `dsize:${dsizeStart}${dsizeOperator}${dsize}`;
            }
            else {
                if (dsizeOperator === '=') rule += `dsize:${dsize}`;
                else if (dsizeOperator === 'Data Size') rule += `dsize:${dsize}`;
                else rule += `dsize:${dsizeOperator}${dsize}`;
            }
            rule += '; ';
        }
        if ((reference !== "Reference") && referenceText) rule += `reference:${reference},${referenceText}; `;
        if (service !== 'Service') rule += `service:${service}; `;



        //Content options
        if (content) {
            if (http_uri) rule += 'http_uri; ';
            rule += `content:"${content}"`;
            if (fast_pattern) rule += ', fast_pattern';
            if (nocase) rule += ', nocase';
            if (offset) rule += `, offset:${offset}`;
            if (depth) rule += `, depth:${depth}`;

            rule += '; ';
        }

        //Regex options
        if (pcre) {
            rule += `pcre:"/${pcre}/"`;
            if (pcreFlagi) rule += 'i';
            if (pcreFlags) rule += 's';
            if (pcreFlagm) rule += 'm';
            if (pcreFlagx) rule += 'x';
            if (pcreFlagA) rule += 'A';
            if (pcreFlagE) rule += 'E';
            if (pcreFlagG) rule += 'G';
            if (pcreFlagO) rule += 'O';
            if (pcreFlagR) rule += 'R';
            rule += '; ';
        }
        if (detection_filterTrack !== 'Track by' && detection_filterCount && detection_filterSeconds) {
            rule += `detection_filter: track ${detection_filterTrack}, count ${detection_filterCount}, seconds ${detection_filterSeconds}; `;
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


        // Hide or show protocol specific options based on protocol selection
        if (protocol !== 'Protocol') {
            document.getElementById('protocolSpecificOptions').style.display = 'flex';
            document.getElementById('protocolSpecificOptionsTitle').style.display = 'block';
            document.getElementById('protocolSpecificOptions').style.border = '2px solid #acacac';
            document.getElementById('protocolSpecificOptions').style.marginBottom = '10px';
            document.getElementById('ipOptions').style.display = (protocol === 'ip') ? 'flex' : 'none';
            document.getElementById('tcpOptions').style.display = (protocol === 'tcp') ? 'flex' : 'none';
            document.getElementById('udpOptions').style.display = (protocol === 'udp') ? 'flex' : 'none';
            document.getElementById('icmpOptions').style.display = (protocol === 'icmp') ? 'flex' : 'none';
        } else {
            document.getElementById('protocolSpecificOptions').style.display = 'none';
            document.getElementById('protocolSpecificOptionsTitle').style.display = 'none';
            document.getElementById('ipOptions').style.display = 'none';
            document.getElementById('tcpOptions').style.display = 'none';
            document.getElementById('udpOptions').style.display = 'none';
            document.getElementById('icmpOptions').style.display = 'none';
            document.getElementById('protocolSpecificOptions').style.border = 'none';
            document.getElementById('protocolSpecificOptions').style.marginBottom = '0px';
        }
    }

    document.getElementById('protocol').addEventListener('change', clearProtocolInputs);
    document.getElementById('outputText').addEventListener('click', () => {
        if (outputField.value) {
            navigator.clipboard.writeText(outputField.value).then(() => {
                document.getElementById('copiedMsg').hidden = false;
                setTimeout(() => {
                    document.getElementById('copiedMsg').hidden = true;
                }, 2000);
            });
        }
    });

    inputs.forEach(input => {input.addEventListener('input', generateRule);});

    function clearProtocolInputs() {
        //Clear IP options
        document.getElementById('ttlOperator').value = 'TTL';
        document.getElementById('ttl').value = '';
        document.getElementById('ttlStart').value = '';
        document.getElementById('ip_protoOperator').value = 'IP Protocol';
        document.getElementById('ip_proto').value = '';
        //Clear TCP options
        document.getElementById('http_method').value = 'HTTP Method';
        document.getElementById('http_stat_code').value = 'HTTP Status Code';
        document.getElementById('flagFIN').checked = false;
        document.getElementById('flagSYN').checked = false;
        document.getElementById('flagRST').checked = false;
        document.getElementById('flagPSH').checked = false;
        document.getElementById('flagACK').checked = false;
        document.getElementById('flagURG').checked = false;
        document.getElementById('flagCWR').checked = false;
        document.getElementById('flagECE').checked = false;
        document.getElementById('flag0').checked = false;
        document.getElementById('flag+').checked = false;
        document.getElementById('flag*').checked = false;   
        document.getElementById('flag!').checked = false;
        document.getElementById('flowState').value = 'Flow State';
        document.getElementById('flowDirection').value = 'Flow Direction';
        //Clear UDP options
        document.getElementById('flowDirectionUDP').value = 'Flow Direction';
        //Clear ICMP options
        document.getElementById('itypeOperator').value = 'ICMP Type';
        document.getElementById('itype').value = '';
        document.getElementById('itypeStart').value = '';
        document.getElementById('icodeOperator').value = 'ICMP Code';
        document.getElementById('icode').value = '';
        document.getElementById('icodeStart').value = '';

        generateRule();
    }

    
    document.getElementById('protocolSpecificOptions').style.display = 'none';
    document.getElementById('protocolSpecificOptionsTitle').style.display = 'none';
    document.getElementById('ipOptions').style.display = 'none';
    document.getElementById('tcpOptions').style.display = 'none';
    document.getElementById('udpOptions').style.display = 'none';
    document.getElementById('icmpOptions').style.display = 'none';
    document.getElementById('protocolSpecificOptions').style.border = '2px solid #acacac';
    document.getElementById('protocolSpecificOptions').style.marginBottom = '0px';

});