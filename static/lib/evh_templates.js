const evh_templates = {
    "html": {
        "form wrap": `
            <div class="row">
                <div class="col s12 center">
                    <strong class="center-align determinate-text">%pctdisplay%</strong>
                </div>
                <div class="progress">
                    <div class="determinate" style="width: %pct%"></div>
                </div>
            </div>
            <div class="row">
                <div class="col s12 center bannered">
                    <img src="static/images/csps_flag.png" class="responsive-img csps-flag" alt="CSPS-EFPC Flag, Maple leaf in book" />
                </div>
            </div>
            <form id="evalhalla_form" action="#">
                <div class="ev-page ev-page-1 card-panel">
                    %src
                </div>
                <div class="row">
                 <div class="col s12 center">
                    <a class="btn btn-large purp-canada-ca ev-page-sel-left left"><em class="material-icons fab-align">chevron_left</em></a>
                    <a id="evalhalla_submit" class="waves-effect waves-light green-canada-ca btn-large ">
                        <span class="en">SUBMIT</span><span class="fr">PROVIR</span></a>
                    <a class="btn btn-large purp-canada-ca ev-page-sel-right right"><em class="material-icons fab-align">chevron_right</em></a>
                 </div>
                </div>
                <div class="row">
                    <ul class="pagination center-align" style="marigin:0;">
                        
                        %pages
                        
                    </ul>
                </div>
                
            </form>       
        `,
        /**
         * <li class="waves-effect ev-page-sel-left"><a><em class="material-icons">chevron_left</em></a></li>
                        <li class="waves-effect ev-page-sel-right"><a><em class="material-icons">chevron_right</em></a></li>
                        
                        <div class="row">
                    <div class="col s12 center">
                        <a id="evalhalla_submit" class="waves-effect waves-light purp-canada-ca btn-large">
                        <span class="en">SUBMIT</span><span class="fr">PROVIR</span></a>
                    </div>
                </div> */
        "header": `
            <div class="row">
                <div class="col s12 center">
                    <h2>%title<br/>(%survey)</h2>
                    <p class="flow-text left-align light">%intro</p>
                </div>
            </div>
        `,
        "question": `
            <div class="card-panel purp-canada-ca-edged">
                <blockquote><span class="badge" style="font-size:1.5em;margin:0px;">
                %req</span> %question</blockquote><div class="padbox">%form</div>
            </div>
        `,
        "scale": `
            <div class="row">
                <div class="col s12" >
                    <label class="lg-lbl" for="scale_qid_%qid" id="lbl_scale_qid_%qid"><span class="en">Choose your rating</span><span class="fr">Chosir s.v.p.</span></label>
                    <select class="%reqcls browser-default" %reqattr id="scale_qid_%qid" name="scale_qid_%qid" aria-labelledby="lbl_scale_qid_%qid">
                    <option value="" disabled selected></option>
                    <option value="1">1 %low</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10 %high</option>
                    <option value="77">%unsure</option>
                    </select>
                </div>
            </div> 
        `,
        "scale1-5": `
            <div class="row">
                <div class="col s12" >
                    <label class="lg-lbl" for="scale_qid_%qid" id="lbl_scale_qid_%qid"><span class="en">Choose your rating</span><span class="fr">Chosir s.v.p.</span></label>
                    <select class="%reqcls browser-default" %reqattr id="scale_qid_%qid" name="scale_qid_%qid" aria-labelledby="lbl_scale_qid_%qid">
                    <option value="" disabled selected></option>
                    <option value="1">1 %low</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 %high</option>
                    <option value="77">%unsure</option>
                    </select>
                </div>
            </div> 
        `,
        "open": `
            <div class="row">
                <div class="row">
                    <div class="input-field col s12">
                        <label for="textarea_qid_%qid"><span class="en">Enter your answer</span><span class="fr">Provir votre reponse</span></label>
                        <textarea type="text" %reqattr id="textarea_qid_%qid" name="textarea_qid_%qid" class="%reqcls materialize-textarea"></textarea>
                    </div>
                </div>
            </div>
        `,
        "pick one": `
            <div class="row">
                <label>
                    <input class="with-gap %reqcls" %reqattr name="rgroup_qid_%qid" type="radio" value="%vpick" />
                    <span>%pick</span>
                </label>
            </div>
        `,
        "pick any": `
            <div class="row">
                <label>
                    <input class="with-gap" name="cgroup_qid_%qid[]" type="checkbox" value="%vpick" />
                    <span>%pick</span>
                </label>
            </div>
        `,
        "rank": `
            <div class="row">
                <div class="col s12">
                <div class="input-field s12">
                <input class="%reqcls" %reqattr id="inline_qid_%qid_oid_%oid" name="inline_qid_%qid_oid_%oid" type="text">
                <label for="inline_qid_%qid_oid_%oid">%pick</label>
                </div>
                </div>
            </div>
        `,
        "instruction": `
            <div class="card-panel blue-canada-ca darken-2">
                <span class="white-text">%instruction</span>
            </div>
        `,
        "ls": `
            <table class="highlight responsive-table">
                <thead>
                <tr>
                <th><span class="en">Survey</span><span class="fr">Enquête</span></th>
                <th><span class="en">Details</span><span class="fr">Details</span></th>
                <th><span class="en">Lang</span><span class="fr">Lang</span></th>
                <th><span class="en">Items</span><span class="fr">Articles</span></th>
                </tr>
                </thead>
                <tbody>
                %tbody
                </tbody>
            </table>
        `,
        "ls_header": `
            <nav>
                <div class="nav-wrapper blue-canada-ca darken-1">
                    <div class="col s12">
                        <span class="en">%en</span>
                        <span class="fr">%fr</span>
                    </div>
                </div>
            </nav>`,
        "generics": `
            <div class="row">
            <div class="col s6">
            <div class="input-field s6">
            <input id="inline_qid_%qid_dept_0" class="ev_inline_dept %reqcls" %reqattr name="inline_qid_%qid_dept_0" type="text">
            <label for="inline_qid_%qid_dept_0"><span class="en">Department</span><span class="fr">Department</span></label>
            </div>
            </div>
            <div class="col s6">
            <div class="input-field s6">
            <input id="inline_qid_%qid_role_1" class="ev_inline_role %reqcls" %reqattr  name="inline_qid_%qid_role_1" type="text">
            <label for="inline_qid_%qid_role_1"><span class="en">Role</span><span class="fr">Role</span></label>
            </div>
            </div>
            </div>
            <div class="row">
            <div class="col s6">
            <div class="input-field s6">
            <input id="inline_qid_%qid_region_2" class="ev_inline_region %reqcls" %reqattr  name="inline_qid_%qid_region_2" type="text">
            <label for="inline_qid_%qid_region_2"><span class="en">Region</span><span class="fr">Region</span></label>
            </div>
            </div>
            <div class="col s6">
            <div class="input-field s6">
            <input id="inline_qid_%qid_office_3" class="ev_inline_office %reqcls" %reqattr  name="inline_qid_%qid_office_3" type="text">
            <label for="inline_qid_%qid_office_3"><span class="en">Office</span><span class="fr">Office</span></label>
            </div>
            </div>
            </div>
            `,
        "qlib entry": `
            <tr>
                <td>
                    <div id="bqlib_%bqid">%question
                    </div>
                </td>
                <td>%ctrl</td>
            </tr>
        `,
        "page break": `</div><div class="ev-page ev-page-%pageid card-panel">`,
    },
    "json": {
        "header": `{
            "title": "%title",
            "description": "%intro",
            "language": "%lang",
            "questions": [%questions]
        }`,
        "question": `{
            "qid": "%qid",
            "question": "%question",
            "description": "%question",
            "language": "%lang",
            "questionType": "%type",
            "required": "%req",
            "randomOrder": "%rand_order",
            "randomOptions": "%rand_options",
            "options": [%options]
        }`,
        "scale": `
            "1 %low",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10 %high",
            "%unsure"
        `,
        "scale1-5": `
            "1 %low",
            "2",
            "3",
            "4",
            "5 %high",
            "%unsure"
        `,
        "open": ``,
        "pick one": `"%pick"`,
        "pick any": `"%pick"`,
        "rank": `"%pick"`,
        "instruction": `{
            "qid": "none",
            "question": "%instruction",
            "description": "%instruction",
            "language": "%lang",
            "questionType": "instruction",
            "randomOrder": "%rand_order",
            "randomOptions": "%rand_options",
            "options": []
        }`,
        "ls": ``,
        "ls_header": ``,
        "generics": `"%field"`,
        "qlib entry": ``,
        "page break": `{
            "qid": "none",
            "question": "none",
            "description": "none",
            "language": "none",
            "questionType": "page break",
            "randomOrder": "false",
            "randomOptions": "false",
            "options": []
        }`,
    }
};