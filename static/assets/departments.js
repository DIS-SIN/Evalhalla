﻿
var autoc_departments = [
    "Administration canadienne de la sûreté du transport aérien (CATSA-ACSTA)",
    "Administration de pilotage de l'Atlantique Canada (APA-APA)",
    "Administration de pilotage des Grands Lacs Canada (GLPA-APGL)",
    "Administration de pilotage des Laurentides Canada (LPA-APL)",
    "Administration de pilotage du Pacifique Canada (PPA-APP)",
    "Administration du pipe-line du Nord Canada (NPA-APN)",
    "Administration portuaire de Halifax (HPA-APH)",
    "Administrative Tribunals Support Service of Canada (ATSSC-SCDATA)",
    "Affaires autochtones et du Nord Canada (INAC-AANC)",
    "Affaires intergouvernementales du Nord et commerce intérieur (IANAIT-AINCI)",
    "Affaires mondiales Canada (GAC-AMC)",
    "Agence canadienne de développement économique du Nord (CanNor-CanNor)",
    "Agence canadienne d'évaluation environnementale (CEAA-ACEE)",
    "Agence canadienne d'inspection des aliments (CFIA-ACIA)",
    "Agence de la consommation en matière financière du Canada (FCAC-ACFC)",
    "Agence de la santé publique du Canada (PHAC-ASPC)",
    "Agence de promotion économique du Canada atlantique (ACOA-APECA)",
    "Agence des services frontaliers du Canada (CBSA-ASFC)",
    "Agence du revenu du Canada (CRA-ARC)",
    "Agence fédérale de développement économique pour le Sud de l'Ontario (FedDev Ontario-FedDev Ontario)",
    "Agence spatiale canadienne (CSA-ASC)",
    "Agriculture and Agri-Food Canada (AAFC-AAC)",
    "Agriculture et Agroalimentaire Canada (AAFC-AAC)",
    "Anciens Combattants Canada (VAC-ACC)",
    "Association of Professional Executives of the Public Service of Canada (APEX-APEX)",
    "Association professionnelle des cadres supérieurs de la Fonction publique du Canada (APEX-APEX)",
    "Atlantic Canada Opportunities Agency (ACOA-APECA)",
    "Atlantic Pilotage Authority (APA-APA)",
    "Atomic Energy of Canada Limited (AECL-EACL)",
    "Auditor General of Canada, Office of the (OAG-BVG)",
    "Bank of Canada (BOC-BDC)",
    "Banque du Canada (BOC-BDC)",
    "Bibliothèque du Parlement (LOP-BDP)",
    "Bibliothèque et Archives Canada (LAC-BAC)",
    "Bureau de la sécurité des transports du Canada (TSB-BST)",
    "Bureau de l'ombudsman de l'approvisionnement (OPO-BOA)",
    "Bureau de l'ombudsman des contribuables (OTO-BOC)",
    "Bureau du commissaire du Centre de la sécurité des télécommunications (OCSEC-BCCST)",
    "Bureau du Conseil privé (PCO-BCP)",
    "Bureau du conseiller sénatorial en éthique (SEO-CSE)",
    "Bureau du directeur général des élections (CEO-DGE)",
    "Bureau du secrétaire du gouverneur général (OSGG-BSGG)",
    "Bureau du surintendant des institutions financières Canada (OSFI-BSIF)",
    "Bureau du vérificateur général du Canada (OAG-BVG)",
    "Caisse d'indemnisation des dommages dus à la pollution par hydrocarbures causée par les navires (SOPF-CIDP)",
    "Canada Border Services Agency (CBSA-ASFC)",
    "Canada Council for the Arts (CC-CAC)",
    "Canada Deposit Insurance Corporation (CDIC-SADC)",
    "Canada Economic Development for Quebec Regions (CED-DEC)",
    "Canada Industrial Relations Board (CIRB-CCRI)",
    "Canada Mortgage and Housing Corporation (CMHC-SCHL)",
    "Canada Revenue Agency (CRA-ARC)",
    "Canada School of Public Service (CSPS-EFPC)",
    "Canadian Air Transport Security Authority (CATSA-ACSTA)",
    "Canadian Centre for Occupational Health and Safety (CCOHS-CCHST)",
    "Canadian Centre on Substance Abuse (CCSA-CCLT)",
    "Canadian Commercial Corporation (CCC-CCC)",
    "Canadian Cultural Property Export Review Board (CCPERB-CCEEBC)",
    "Canadian Dairy Commission (CDC-CCL)",
    "Canadian Environmental Assessment Agency (CEAA-ACEE)",
    "Canadian Food Inspection Agency (CFIA-ACIA)",
    "Canadian Grain Commission (CGC-CCG)",
    "Canadian Heritage (PCH-PCH)",
    "Canadian Human Rights Commission (CHRC-CCDP)",
    "Canadian Human Rights Tribunal (HRTC-TDPC)",
    "Canadian Institutes of Health Research (CIHR-IRSC)",
    "Canadian Intergovernmental Conference Secretariat (CICS-SCIC)",
    "Canadian International Trade Tribunal (CITT-TCCE)",
    "Canadian Judicial Council (CJC-CCM)",
    "Canadian Museum for Human Rights (CMHR-MCDP)",
    "Canadian Museum of History (CMH-MCH)",
    "Canadian Museum of Immigration at Pier 21 (CMIP-MCIQ)",
    "Canadian Museum of Nature (CMN-MCN)",
    "Canadian Northern Economic Development Agency (CanNor-CanNor)",
    "Canadian Nuclear Safety Commission (CNSC-CCSN)",
    "Canadian Radio-television and Telecommunications Commission (CRTC-CRTC)",
    "Canadian Security Intelligence Service (CSIS-SCRS)",
    "Canadian Space Agency (CSA-ASC)",
    "Canadian Transportation Agency (CTA-OTC)",
    "CBC/Radio-Canada (CBC-Radio-Canada)",
    "Centre canadien de lutte contre les toxicomanies (CCSA-CCLT)",
    "Centre canadien d'hygiène et de sécurité au travail (CCOHS-CCHST)",
    "Centre d'analyse des opérations et déclarations financières du Canada (FINTRAC-CANAFE)",
    "Centre de la sécurité des télécommunications Canada (CSEC-CSTC)",
    "Centre de recherches pour le développement international (IDRC-CRDI)",
    "Centre national des arts (NAC-CNA)",
    "Chambre des communes (HoC-CdC)",
    "Civilian Review and Complaints Commission for the RCMP (CRCC-CCETP)",
    "Comité de surveillance des activités de renseignement de sécurité (SIRC-CSARS)",
    "Comité externe d'examen de la Gendarmerie royale du Canada (ERC-CEE)",
    "Comité externe d'examen des griefs militaires (MGERC-CEEGM)",
    "Commissariat à la magistrature fédérale Canada (FJA-CMF)",
    "Commissariat à la protection de la vie privée du Canada (OPC-CPVP)",
    "Commissariat à l'information au Canada (OIC-CI)",
    "Commissariat à l'intégrité du secteur public du Canada (PSIC-ISPC)",
    "Commissariat au lobbying du Canada (OCL-CAL)",
    "Commissariat aux conflits d'intérêts et à l'éthique (CIEC-CCIE)",
    "Commissariat aux langues officielles (OCOL-CLO)",
    "Commission canadienne de sûreté nucléaire (CNSC-CCSN)",
    "Commission canadienne des droits de la personne (CHRC-CCDP)",
    "Commission canadienne des grains (CGC-CCG)",
    "Commission canadienne d'examen des exportations de biens culturels (CCPERB-CCEEBC)",
    "Commission canadienne du lait (CDC-CCL)",
    "Commission civile d'examen et de traitement des plaintes relatives à la GRC (CRCC-CCETP)",
    "Commission de la capitale nationale (NCC-CCN)",
    "Commission de la fonction publique du Canada (PSC-CFP)",
    "Commission de l'immigration et du statut de réfugié du Canada (IRB-CISR)",
    "Commission des champs de bataille nationaux (NBC-CCBN)",
    "Commission des libérations conditionnelles du Canada (PBC-CLCC)",
    "Commission des relations de travail et de l'emploi dans la fonction publique (PSLREB-CRTEFP)",
    "Commission d'examen des plaintes concernant la police militaire du Canada (MPCC-CPPM)",
    "Commission du droit d'auteur Canada (CB-CDA)",
    "Commission mixte internationale (IJC-CMI)",
    "Communications Security Establishment Canada (CSEC-CSTC)",
    "Competition Tribunal (CT-TC)",
    "Conseil canadien de la magistrature (CJC-CCM)",
    "Conseil canadien des normes (SCC-CCN-SCC-CCN)",
    "Conseil canadien des relations industrielles (CIRB-CCRI)",
    "Conseil de la radiodiffusion et des télécommunications canadiennes (CRTC-CRTC)",
    "Conseil de recherches en sciences et en génie Canada (NSERC-CRSNG)",
    "Conseil de recherches en sciences humaines du Canada (SSHRC-CRSH)",
    "Conseil des arts du Canada (CC-CAC)",
    "Conseil des produits agricoles du Canada (FPCC-CPAC)",
    "Conseil d'examen du prix des médicaments brevetés Canada (PMPRB-CEPMB)",
    "Conseil fédéral du Québec (QFC-CFQ)",
    "Conseil national de recherches Canada (NRC-CNRC)",
    "Construction de Défense Canada (DCC-CDC)",
    "Copyright Board Canada (CB-CDA)",
    "Corporation commerciale canadienne (CCC-CCC)",
    "Correctional Service Canada (CSC-SCC)",
    "Cour canadienne de l'impôt (TCC-CCI)",
    "Cour d'appel de la cour martiale du Canada (CMAC-CACM)",
    "Cour d'appel fédérale (FCA-CAF)",
    "Cour fédérale (FC-CF)",
    "Cour suprême du Canada (SCC-CSC)",
    "Court Martial Appeal Court of Canada (CMAC-CACM)",
    "Courts Administration Service (CAS-SATJ)",
    "Defence Construction Canada (DCC-CDC)",
    "Defence Research and Development Canada (DRDC) (DRDC-RDDC)",
    "Défense nationale (DND-MDN)",
    "Democratic Institutions (DI-ID)",
    "Destination Canada (DC-DC)",
    "Destination Canada (DC-DC)",
    "Développement économique Canada pour les régions du Québec (CED-DEC)",
    "Développement économique rural (RED-DER)",
    "Directeur parlementaire du budget (PBO-DPB)",
    "Diversification de l'économie de l'Ouest Canada (WD-DEO)",
    "École de la fonction publique du Canada (CSPS-EFPC)",
    "Emploi et Développement social Canada (ESDC-EDSC)",
    "Employment and Social Development Canada (ESDC-EDSC)",
    "Énergie atomique du Canada, Limitée (AECL-EACL)",
    "Enquêteur correctionnel Canada (OCI-BEC)",
    "Environment and Climate Change Canada (ECCC-ECCC)",
    "Environnement et Changement climatique Canada (ECCC-ECCC)",
    "Farm Credit Canada (FCC-FAC)",
    "Farm Products Council of Canada (FPCC-CPAC)",
    "Federal Court (FC-CF)",
    "Federal Court of Appeal (FCA-CAF)",
    "Federal Economic Development Agency for Southern Ontario (FedDev Ontario-FedDev Ontario)",
    "Federal Public Sector Labour Relations and Employment Board (PSLREB-CRTEFP)",
    "Femmes et Égalité des genres Canada (WAGE-FEGC)",
    "Finance Canada (FIN-FIN)",
    "Financement agricole Canada (FCC-FAC)",
    "Finances Canada, Ministère des (FIN-FIN)",
    "Financial Consumer Agency of Canada (FCAC-ACFC)",
    "Financial Transactions and Reports Analysis Centre of Canada (FINTRAC-CANAFE)",
    "Fisheries and Oceans Canada (DFO-MPO)",
    "Gendarmerie royale du Canada (RCMP-GRC)",
    "Global Affairs Canada (GAC-AMC)",
    "Gouverneur général du Canada (OSGG-BSGG)",
    "Governor General (OSGG-BSGG)",
    "Great Lakes Pilotage Authority Canada (GLPA-APGL)",
    "Greffe du Tribunal des revendications particulières du Canada (SCT-TRP)",
    "Halifax Port Authority (HPA-APH)",
    "Health Canada (HC-SC)",
    "Horizons de politiques Canada (Horizons-Horizons)",
    "House of Commons (HoC-CdC)",
    "Immigration and Refugee Board of Canada (IRB-CISR)",
    "Immigration, Refugees and Citizenship Canada (IRCC-IRCC)",
    "Immigration, Réfugiés et Citoyenneté Canada (IRCC-IRCC)",
    "Indian Residential Schools Adjudication Secretariat (IRSAS-SAPI)",
    "Indigenous and Northern Affairs Canada (INAC-AANC)",
    "Indigenous Services Canada (ISC-SAC)",
    "Infrastructure Canada (INFC-INFC)",
    "Infrastructure Canada (INFC-INFC)",
    "Ingenium (CSTMC-SMSTC)",
    "Ingenium (CSTMC-SMSTC)",
    "Innovation, Science and Economic Development Canada (ISED-ISDE)",
    "Innovation, Sciences et Développement économique Canada (ISED-ISDE)",
    "Institutions démocratiques (DI-ID)",
    "Instituts de recherche en santé du Canada (CIHR-IRSC)",
    "Intergovernmental and Northern Affairs and Internal Trade (IANAIT-AINCI)",
    "International Development Research Centre (IDRC-CRDI)",
    "International Joint Commission (IJC-CMI)",
    "Justice Canada (JUS-JUS)",
    "Justice Canada, Ministère de la (JUS-JUS)",
    "Laurentian Pilotage Authority Canada (LPA-APL)",
    "Leader du gouvernement à la Chambre des communes (LGHC-LGCC)",
    "Library and Archives Canada (LAC-BAC)",
    "Library of Parliament (LOP-BDP)",
    "Military Grievances External Review Committee (MGERC-CEEGM)",
    "Military Police Complaints Commission of Canada (MPCC-CPPM)",
    "Monnaie royale canadienne (Mint-Monnaie)",
    "Musée canadien de la nature (CMN-MCN)",
    "Musée canadien de l'histoire (CMH-MCH)",
    "Musée canadien de l'immigration du Quai 21 (CMIP-MCIQ)",
    "Musée canadien pour les droits de la personne (CMHR-MCDP)",
    "Musée des beaux-arts du Canada (NGC-MBAC)",
    "National Arts Centre (NAC-CNA)",
    "National Capital Commission (NCC-CCN)",
    "National Defence (DND-MDN)",
    "National Energy Board (NEB-ONE)",
    "National Film Board of Canada (NFB-ONF)",
    "National Gallery of Canada (NGC-MBAC)",
    "National Research Council Canada (NRC-CNRC)",
    "Natural Resources Canada (NRCan-RNCan)",
    "Natural Sciences and Engineering Research Council of Canada (NSERC-CRSNG)",
    "Northern Pipeline Agency (NPA-APN)",
    "Office des transports du Canada (CTA-OTC)",
    "Office national de l'énergie (NEB-ONE)",
    "Office national du film (NFB-ONF)",
    "Office of the Chief Electoral Officer (CEO-DGE)",
    "Office of the Commissioner for Federal Judicial Affairs Canada (FJA-CMF)",
    "Office of the Commissioner of Lobbying of Canada (OCL-CAL)",
    "Office of the Commissioner of Official Languages (OCOL-CLO)",
    "Office of the Communications Security Establishment Commissioner (OCSEC-BCCST)",
    "Office of the Conflict of Interest and Ethics Commissioner (CIEC-CCIE)",
    "Office of the Correctional Investigator Canada (OCI-BEC)",
    "Office of the Information Commissioner of Canada (OIC-CI)",
    "Office of the Leader of the Government in the House of Commons (LGHC-LGCC)",
    "Office of the Privacy Commissioner of Canada (OPC-CPVP)",
    "Office of the Procurement Ombudsman (OPO-BOA)",
    "Office of the Public Sector Integrity Commissioner of Canada (PSIC-ISPC)",
    "Office of the Secretary to the Governor General (OSGG-BSGG)",
    "Office of the Senate Ethics Officer (SEO-CSE)",
    "Office of the Superintendent of Financial Institutions Canada (OSFI-BSIF)",
    "Office of the Taxpayers' Ombudsman (OTO-BOC)",
    "Pacific Pilotage Authority Canada (PPA-APP)",
    "Parcs Canada (PC-PC)",
    "Parks Canada (PC-PC)",
    "Parlement du Canada (PARL-PARL)",
    "Parliament of Canada (PARL-PARL)",
    "Parliamentary Budget Officer (PBO-DPB)",
    "Parole Board of Canada (PBC-CLCC)",
    "Patented Medicine Prices Review Board (PMPRB-CEPMB)",
    "Patrimoine canadien (PCH-PCH)",
    "Pêches et Océans Canada (DFO-MPO)",
    "Polar Knowledge Canada (POLAR-POLAIRE)",
    "Policy Horizons Canada (Horizons-Horizons)",
    "Ponts Jacques-Cartier et Champlain (JCCBI-PJCCI)",
    "PPP Canada (P3C-P3C)",
    "PPP Canada (P3C-P3C)",
    "Premier ministre du Canada (PMO-CPM)",
    "Prime Minister's Office (PMO-CPM)",
    "Privy Council Office (PCO-BCP)",
    "Public Health Agency of Canada (PHAC-ASPC)",
    "Public Prosecution Service of Canada (PPSC-SPPC)",
    "Public Safety Canada (PS-SP)",
    "Public Servants Disclosure Protection Tribunal Canada (PSDPTC-TPFDC)",
    "Public Service Commission (PSC-CFP)",
    "Public Services and Procurement Canada (PSPC-SPAC)",
    "Quebec Federal Council (QFC-CFQ)",
    "Radio Canada (CBC-Radio-Canada)",
    "Recherche et développement pour la Défense Canada (DRDC-RDDC)",
    "Ressources naturelles Canada (NRCan-RNCan)",
    "Royal Canadian Mint (Mint-Monnaie)",
    "Royal Canadian Mounted Police (RCMP-GRC)",
    "Royal Canadian Mounted Police External Review Committee (ERC-CEE)",
    "Royal Society of Canada, The (RSC-SRC)",
    "Rural Economic Development (RED-DER)",
    "Santé Canada (HC-SC)",
    "Savoir polaire Canada (POLAR-POLAIRE)",
    "Secrétariat d'adjudication des pensionnats indiens (IRSAS-SAPI)",
    "Secrétariat des conférences intergouvernementales canadiennes (CICS-SCIC)",
    "Secrétariat du Conseil du Trésor du Canada (TBS-SCT)",
    "Sécurité publique Canada (PS-SP)",
    "Security Intelligence Review Committee (SIRC-CSARS)",
    "Sénat du Canada (Sen-Sen)",
    "Senate of Canada (Sen-Sen)",
    "Service administratif des tribunaux judiciaires (CAS-SATJ)",
    "Service canadien d'appui aux tribunaux administratifs (ATSSC-SCDATA)",
    "Service canadien du renseignement de sécurité (CSIS-SCRS)",
    "Service correctionnel Canada (CSC-SCC)",
    "Service des poursuites pénales du Canada (PPSC-SPPC)",
    "Services aux Autochtones Canada (ISC-SAC)",
    "Services partagés Canada (SSC-SPC)",
    "Services publics et Approvisionnement Canada (PSPC-SPAC)",
    "Shared Services Canada (SSC-SPC)",
    "Ship-source Oil Pollution Fund (SOPF-CIDP)",
    "Social Sciences and Humanities Research Council of Canada (SSHRC-CRSH)",
    "Social Security Tribunal of Canada (SST-TSS)",
    "Société canadienne d'hypothèques et de logement (CMHC-SCHL)",
    "Société d'assurance-dépôts du Canada (CDIC-SADC)",
    "Société des ponts fédéraux (FBCL-SPFL)",
    "Société royale du Canada, La (RSC-SRC)",
    "Specific Claims Tribunal (SCT-TRP)",
    "St Lawrence Seaway Management Corporation, The (SLS-VMSL)",
    "Standards Council of Canada (SCC-CCN-SCC-CCN)",
    "Statistics Canada (StatCan-StatCan)",
    "Statistique Canada (StatCan-StatCan)",
    "Supreme Court of Canada (SCC-CSC)",
    "Tax Court of Canada (TCC-CCI)",
    "Telefilm Canada (TFC-TFC)",
    "Téléfilm Canada (TFC-TFC)",
    "The Federal Bridge Corporation Limited (FBCL-SPFL)",
    "The Jacques Cartier and Champlain Bridges Incorporated (JCCBI-PJCCI)",
    "The National Battlefields Commission (NBC-CCBN)",
    "Transport Canada (TC-TC)",
    "Transportation Appeal Tribunal of Canada (TATC-TATC)",
    "Transportation Safety Board of Canada (TSB-BST)",
    "Transports Canada (TC-TC)",
    "Treasury Board of Canada Secretariat (TBS-SCT)",
    "Tribunal canadien du commerce extérieur (CITT-TCCE)",
    "Tribunal d'appel des transports du Canada (TATC-TATC)",
    "Tribunal de la concurrence (CT-TC)",
    "Tribunal de la protection des fonctionnaires divulgateurs Canada (PSDPTC-TPFDC)",
    "Tribunal de la sécurité sociale du Canada (SST-TSS)",
    "Tribunal des anciens combattants (révision et appel) (VRAB-TACRA)",
    "Tribunal des droits de la personne du Canada (HRTC-TDPC)",
    "Veterans Affairs Canada (VAC-ACC)",
    "Veterans Review and Appeal Board (VRAB-TACRA)",
    "Voie maritime du Saint-Laurent, Corporation de gestion de la (SLS-VMSL)",
    "Western Economic Diversification Canada (WD-DEO)",
    "Women and Gender Equality Canada (WAGE-FEGC)"
];
