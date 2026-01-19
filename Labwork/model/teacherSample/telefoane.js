
/*---------------------------------------------------------------------------*/

function Telefoane()
{
	//console.log("constructor Projects");

	this.id="telefoane";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Telefoane.prototype.read=function()
{
	console.log("Telefoane.read");
	
	$("#main-panel").empty();
	
	var telefoane=this;
	$.ajax(
	{
		url: "./telefoane.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		telefoane.onRead(JSON.parse(data));
	});
};

Telefoane.prototype.onRead=function(data)
{
	console.log("Telefoane.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Telefon(
			items[i].id,
			items[i].producator,
			items[i].model,
			items[i].pret,
			items[i].creation_date);
	}

	this.show();
};

Telefoane.prototype.show=function()
{
	console.log("Telefoane.show");
	
	var divTelefoane=$('<div class="list-group"> </div>');

	itemTelefon=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group-xs mb-2">'+
		'<button type="button" class="btn btn-sm btn-outline-warning" onclick="telefoane.newTelefon();">'+
		'<i class="bi bi-pencil-square me-1"></i> Telefon nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTelefoane.append(itemTelefon);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemTelefon=$(
		'<a href="#" class="list-group-item" id="telefon'+this.children[i].id+'">'+
		'Producator: '+this.children[i].producator+' '+
		'Model: '+this.children[i].model+' '+
		'Pret: '+this.children[i].pret+' '+
		'Created at: '+this.children[i].creation_date+' '+
		
		'<div class="d-flex justify-content-end gap-2">' +
		'<button type="button" class="btn btn-sm btn-outline-warning" ' + 'onclick="telefoane.editTelefon(' + this.children[i].id + ');">' +
        '<i class="bi bi-pencil-square me-1"></i>Edit' + '</button>' +
		'<button type="button" class="btn btn-sm btn-outline-danger" ' + 'onclick="telefoane.deleteTelefon(' + this.children[i].id + ');">' +
        '<i class="bi bi-trash me-1"></i>Delete' +
		'</button>' +
		'</div>' +
		'</a>'
		);		
		divTelefoane.append(itemTelefon);
	}
	$("#main-panel").append(divTelefoane);
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.newTelefon=function()
{
	console.log("Telefoane.newTelefon");
	
	var divInputGroup=$('<div class="input-group-sm mb-3" id="inputGroup"> </div>');
	divInputGroup.append($('<p> &nbsp; </p>'));

	divInputGroup.append($(
		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Producator</span>'+		
		'<input id="producator" type="text" class="form-control producator" placeholder="producator">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Model</span>'+		
		'<input id="model" type="text" class="form-control model" placeholder="model">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Pret</span>'+		
		'<input id="pret" type="text" class="form-control pret" placeholder="pret">'+
		'</div>'+
		''
	));
	
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-sm btn-outline-warning" '+'onclick="telefoane.createTelefon();"><i class="bi bi-save me-1"></i> Save</button>'+
		'<button type="button" class="btn btn-sm btn-outline-primary" '+'onclick="telefoane.onCreateTelefon();"><i class="bi bi-x-circle"></i> Cancel</button>'+		
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Telefoane.prototype.createTelefon=function()
{
	console.log("Telefoane.saveTelefon");
	
	var producator=$("#producator").val();
	var model=$("#model").val();
	var pret=$("#pret").val();

	console.log(producator);
	console.log(model);
	console.log(pret);
	
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?create=1"+
		"&producator="+producator+
		"&model="+model+
		"&pret="+pret,
		
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		telefoane.onCreateTelefon(JSON.parse(data));
	});
}

Telefoane.prototype.onCreateTelefon=function(message)
{
	console.log("Telefoane.onCreateTelefon");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.getTelefon=function(id)
{
	for(i=0;i<this.children.length;i++)
	{
		if(this.children[i].id==id)
		{
			return this.children[i];
		}
	}
	
	return null;
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.editTelefon=function(id)
{
	console.log("Telefoane.editTelefon");
	
	var telefoane=this;
	var divInputGroup=$('<div class="input-group-sm mb-3" id="inputGroup"> </div>');
	divInputGroup.append($('<p> &nbsp; </p>'));
	
	divInputGroup.append($(
		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Producator</span>'+		
		'<input id="producator" type="text" class="form-control producator" placeholder="producator" value="'+telefoane.getTelefon(id).producator+'">'+
		'</div>'+

		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Model</span>'+		
		'<input id="model" type="text" class="form-control model" placeholder="model" value="'+telefoane.getTelefon(id).model+'">'+
		'</div>'+

		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Pret</span>'+		
		'<input id="pret" type="text" class="form-control pret" placeholder="pret" value="'+telefoane.getTelefon(id).pret+'">'+
		'</div>'+
		
		'<div class="input-group mb-2">'+
		'<span class="input-group-text">Creation date</span>'+		
		'<input id="creation_date" type="text" class="form-control creation_date" placeholder="creation_date" value="'+telefoane.getTelefon(id).creation_date+'">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-sm btn-outline-warning" '+'onclick="telefoane.updateTelefon('+id+');"><i class="bi bi-save me-1"></i> Save</button>'+
		'<button type="button" class="btn btn-sm btn-outline-primary" '+'onclick="telefoane.onUpdateTelefon();"><i class="bi bi-x-circle"></i> Cancel</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);	
}

Telefoane.prototype.updateTelefon=function(id)
{
	console.log("Telefoane.updateTelefon");

	var producator=$("#producator").val();
	var model=$("#model").val();
	var pret=$("#pret").val();
	var creation_date=$("#creation_date").val();
	
	console.log(producator);
	console.log(model);
	console.log(pret);
	console.log(creation_date);
	
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?update=1"+
		"&id="+id+
		"&producator="+producator+
		"&model="+model+
		"&pret="+pret+
		"&creation_date="+creation_date,
		
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		telefoane.onUpdateTelefon(JSON.parse(data),id);
	});
}

Telefoane.prototype.onUpdateTelefon=function(message)
{
	console.log("Telefoane.onUpdateTelefon");
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.deleteTelefon=function(id)
{
	console.log("Telefoane.deleteTelefon");
		
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		telefoane.onDeleteTelefon(JSON.parse(data),id);
	});
}

Telefoane.prototype.onDeleteTelefon=function(message,id)
{
	console.log("Telefoane.onDeleteTelefon");
	
	//$("#telefon"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
