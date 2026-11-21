// Source: MLS 201 Clinical Chemistry (Chemical Pathology) lecturer notes - Mr. Adegbola V.P. Format: topic|question|CORRECT|wrong|wrong|wrong|explanation|difficulty
const TP=["Introduction & Scope","Glucose Tests","Renal & Liver Function","Lipids, Enzymes & Markers","Sample Bottles","Order of Draw","Venipuncture","OGTT","Metabolism","Acid-Base Balance","Endocrine System","Laboratory Safety","Glassware & Refrigeration"];
const RAW=`0|Clinical Chemistry is also known as|Chemical Pathology|Histopathology|Haematology|Microbiology|The notes state it is also called Chemical Pathology.|Easy
0|The purpose of clinical chemistry is to|Provide objective biochemical information for diagnosis and monitoring|Culture bacteria|Grade tumours microscopically|Type blood groups|It detects disease early, monitors progression and treatment response.|Easy
0|Urea, creatinine and electrolytes belong to|Renal function|Liver function|Lipid metabolism|Toxicology|The scope lists renal function with urea, creatinine and electrolytes.|Easy
1|Fasting Blood Glucose is measured after a fast of|8-10 hours|2 hours|30 minutes|24 hours|FBG follows an 8-10 hour overnight fast.|Easy
1|A random glucose of at least this value with symptoms strongly suggests diabetes|11.1 mmol/L|5.5 mmol/L|7.0 mmol/L|3.3 mmol/L|The notes give 11.1 mmol/L or more with symptoms.|Medium
1|HbA1c reflects glucose control over about|3 months|1 day|1 week|1 hour|It measures glucose bound to haemoglobin; the diabetic target is <7%.|Medium
2|Creatinine is a by-product of|Muscle metabolism|Fat metabolism|Bile synthesis|Glycolysis|It is used in eGFR calculation and is more specific for the kidney.|Easy
2|Low urea levels are seen in|Severe liver disease|Renal failure|Dehydration|High protein intake|Urea is formed in the liver, so severe liver disease lowers it.|Medium
2|ALP and GGT are elevated in|Biliary obstruction|Hepatocellular injury|Myocardial infarction|Dehydration|AST and ALT rise in hepatocellular injury; ALP and GGT in biliary obstruction.|Medium
3|CK-MB is raised in|Myocardial infarction|Pancreatitis|Bone disease|Hepatitis|The enzyme list pairs CK-MB with myocardial infarction.|Easy
3|The tumour marker for prostate cancer is|PSA|CA-125|AFP|Troponin|PSA is prostate; CA-125 ovarian; AFP liver.|Easy
3|The gold standard marker for diagnosing myocardial infarction is|Troponin|LDH|Amylase|ALP|Troponins are the gold standard; CK-MB requires timing.|Medium
4|The red-top (plain) bottle contains|No anticoagulant|EDTA|Lithium heparin|Sodium citrate|It yields serum after clotting and centrifugation.|Easy
4|The grey-top bottle contains|Sodium fluoride and potassium oxalate|K2-EDTA|Clot activator and gel|Sodium citrate|It is used for glucose and lactate.|Medium
4|Sodium fluoride in the grey-top inhibits|Glycolysis|Coagulation cascade|Haemolysis|Clotting time|It prevents glucose reduction by red cells.|Medium
4|EDTA is unsuitable for many chemistry tests because it|Falsely lowers calcium and magnesium|Clots the blood|Lowers potassium|Activates enzymes|It also raises potassium and interferes with enzyme assays.|Hard
5|The first tube in the CLSI order of draw is|Blood culture bottle|Blue-top|Green-top|Purple-top|Sterility comes first.|Easy
5|The tube drawn immediately after blue-top is|Red-top or SST|Green-top|Grey-top|Purple-top|Order: culture, blue, red/SST, green, purple, grey.|Medium
5|The last tube in the order of draw is|Gray-top|Purple-top|Green-top|Blue-top|Fluoride oxalate tubes come last.|Easy
6|The tourniquet is applied about this distance above the puncture site|3-4 inches|1 inch|8 inches|10 inches|The notes state 3-4 inches.|Easy
6|The preferred vein is the|Median cubital vein|Radial artery|Femoral vein|Jugular vein|Stated as the usually preferred vein.|Easy
6|The needle is inserted bevel up at|15-30 degrees|90 degrees|45-60 degrees|0 degrees|Bevel facing upward at about 15-30 degrees.|Medium
6|Prolonged tourniquet application is more than|One minute|10 seconds|5 minutes|30 minutes|It may affect test results.|Medium
7|The OGTT glucose load for adults is|75 g in 250-300 mL water|50 g in 100 mL|100 g in 500 mL|25 g in 250 mL|75 g anhydrous glucose in 250-300 mL.|Medium
7|The glucose load must be consumed within|5 minutes|30 minutes|1 hour|2 hours|Stated in glucose load administration.|Medium
7|If the patient vomits within 30 minutes of the load|The test is repeated|Continue normally|Give more glucose|Stop permanently|The notes say the test has to be repeated.|Hard
8|Catabolism is|Breakdown of molecules releasing energy|Synthesis requiring ATP|Protein folding|Gene copying|It breaks large molecules into smaller ones.|Easy
8|Glycolysis occurs in the|Cytoplasm|Mitochondria|Nucleus|Ribosome|It produces 2 ATP.|Medium
8|Anaerobic glycolysis when oxygen is low produces|Lactate|Glycogen|Urea|Bilirubin|Useful for interpreting lactate, acidosis and shock.|Medium
9|Normal blood pH is|7.35-7.45|6.8-7.0|7.8-8.0|7.0-7.2|Stated as around 7.35-7.45.|Easy
9|The most important buffer system is|Bicarbonate|Phosphate|Haemoglobin|Albumin|The bicarbonate system underlies Henderson-Hasselbalch.|Medium
9|Respiratory acidosis is seen in|COPD|Hyperventilation|Vomiting|Diuretic use|Also asthma and hypoventilation.|Medium
9|Metabolic alkalosis is caused by|Vomiting|Kidney failure|Lactic acidosis|Ketoacidosis|Also diuretic use.|Hard
10|The master gland is the|Pituitary|Thyroid|Adrenal|Pancreas|It controls other endocrine glands.|Easy
10|Adrenal hormones include|Cortisol, aldosterone, catecholamines|Insulin, glucagon|T3, T4|Estrogen, progesterone|Stated under adrenal glands.|Medium
10|Thyroid function is tested with|TSH, FT4, FT3|Cortisol, ACTH|C-peptide|PSA|Listed under thyroid tests.|Easy
11|When diluting acids, always|Add acid to water|Add water to acid|Heat first|Use a closed flask|This avoids splashing.|Easy
11|The PASS fire system stands for|Pull, Aim, Squeeze, Sweep|Press, Alert, Stop, Spray|Pull, Alert, Spray, Stop|Point, Aim, Shoot, Stop|Stated in fire safety.|Medium
11|Chemical pathology labs apply this biosafety level|Biosafety level 2|Level 1|Level 3|Level 4|Because they handle blood and urine.|Hard
12|Refrigerators are commonly kept at|2-8 degrees C|-20 degrees C|15-25 degrees C|37 degrees C|Freezers are at -20 degrees C.|Easy
12|The first step in cleaning glassware is|Rinse immediately with cold distilled water|Autoclave|Use chromic acid|Air dry|Then detergent, rinses and air drying.|Medium`;
const QB=RAW.split("\n").map((l,i)=>{const p=l.split("|");return{id:i+1,topic:TP[p[0]],question:p[1],options:[p[2],p[3],p[4],p[5]],correctAnswer:0,explanation:p[6],difficulty:p[7],source:"MLS 201 Lecturer Notes"}});
