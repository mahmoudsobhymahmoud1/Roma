(function(){
  var body=document.body;
  var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MAPS="https://maps.app.goo.gl/tC8RXmaaf9AqHYuq5";

  // بتلات الياسمين
  if(!reduce){
    var box=document.getElementById("petals");
    for(var i=0;i<20;i++){
      var p=document.createElement("div"); p.className="petal";
      var s=14+Math.random()*20;
      p.style.cssText="left:"+(Math.random()*100)+"%;--s:"+s+"px;--d:"+(9+Math.random()*9)+"s;--w:"+(-Math.random()*14)+"s;--x:"+((Math.random()-.5)*160)+"px;--r:"+(2+Math.random()*3)+"s";
      p.innerHTML='<svg viewBox="-50 -50 100 100"><use href="#jas"/></svg>';
      box.appendChild(p);
    }
  }

  document.getElementById("openBtn").addEventListener("click",function(){
    body.classList.add("open"); window.scrollTo(0,0);
  });
  if(reduce) body.classList.add("open");

  // العد التنازلي (بتوقيت مصر +03:00 عشان يطلع صح لأي حد في أي بلد)
  var target=new Date("2026-10-22T21:00:00+03:00").getTime();
  var nf=new Intl.NumberFormat("ar-EG");
  function tick(){
    var diff=target-Date.now();
    if(diff<=0){
      document.getElementById("count").style.display="none";
      document.getElementById("note").textContent="ألف مبروك للعروسين";
      return;
    }
    var s=Math.floor(diff/1000);
    document.getElementById("d").textContent=nf.format(Math.floor(s/86400));
    document.getElementById("h").textContent=nf.format(Math.floor(s%86400/3600));
    document.getElementById("m").textContent=nf.format(Math.floor(s%3600/60));
    document.getElementById("s").textContent=nf.format(s%60);
  }
  tick(); setInterval(tick,1000);

  // إضافة للتقويم (ملف .ics)
  document.getElementById("calBtn").addEventListener("click",function(){
    var stamp=new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d+/,"");
    var ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Wedding Invitation//AR","BEGIN:VEVENT",
      "UID:moataz-maryam-20261022@invitation","DTSTAMP:"+stamp,
      "DTSTART:20261022T210000","DTEND:20261023T010000",
      "SUMMARY:زفاف معتز ومريم","LOCATION:قاعة الياسمينا - معصرة ملوي - ملوي",
      "DESCRIPTION:"+MAPS,"END:VEVENT","END:VCALENDAR"].join("\r\n");
    var a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar;charset=utf-8"}));
    a.download="wedding-moataz-maryam.ics";
    document.body.appendChild(a); a.click(); a.remove();
  });

  // مشاركة الدعوة
  var shareBtn=document.getElementById("shareBtn");
  shareBtn.addEventListener("click",function(){
    var data={title:"دعوة زفاف معتز و مريم",text:"أنتم مدعوون لحضور حفل زفاف معتز و مريم",url:location.href};
    if(navigator.share){ navigator.share(data).catch(function(){}); return; }
    if(navigator.clipboard){
      navigator.clipboard.writeText(location.href).then(function(){
        shareBtn.textContent="تم نسخ الرابط";
        setTimeout(function(){shareBtn.textContent="شارك الدعوة";},2500);
      });
    }
  });
})();
