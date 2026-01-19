function Spaceships() {
	this.id = "Spaceships";
	this.children = null;
};

$(document).ready(function () {
	$("#searchText").keypress(function (e) {
		if (e.key == 'Enter') {
			var text = $(this).val();
			spaceships.search(text);
		}
	});
});

Spaceships.prototype.read = function () {
	$("#main-panel").empty();

	var Spaceships = this;
	$.ajax(
		{
			url: "./spaceships.php?read=1",
			beforeSend: function (xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			}
		})
		.done(function (data) {
			console.log(data);
			Spaceships.onRead(JSON.parse(data));
		});
};

Spaceships.prototype.onRead = function (data) {
	var items = data.items;

	this.children = new Array();
	for (i = 0; i < items.length; i++) {
		this.children[i] = new Spaceship(
			items[i].name,
			items[i].type,
			items[i].shipyard,
			items[i].crew);
	}

	this.show();
};

Spaceships.prototype.show = function () {
	var divSpaceships = $('<div class="list-group"> </div>');

	itemSpaceship = $(
		'<a href="#" class="list-group-item">' +
		'<div class="btn-group-xs mb-2">' +
		'<button type="button" class="btn btn-sm btn-outline-warning" onclick="spaceships.newSpaceship();">' +
		'<i class="bi bi-pencil-square me-1"></i> New Spaceship...</button>' +
		'</div>' +
		'</a>'
	);
	divSpaceships.append(itemSpaceship);

	for (i = 0; i < this.children.length; i++) {
		itemSpaceship = $(
			'<a href="#" class="list-group-item" id="spaceship' + this.children[i].name + '">' +
			'Name: ' + this.children[i].name + ' ' +
			'Type: ' + this.children[i].type + ' ' +
			'Shipyard: ' + this.children[i].shipyard + ' ' +
			'Crew: ' + this.children[i].crew + ' ' +

			'<div class="d-flex justify-content-end gap-2">' +
			'<button type="button" class="btn btn-sm btn-outline-warning" ' + 'onclick="spaceships.editSpaceship(\'' + this.children[i].name + '\');">' +
			'<i class="bi bi-pencil-square me-1"></i>Edit' + '</button>' +
			'<button type="button" class="btn btn-sm btn-outline-danger" ' + 'onclick="spaceships.deleteSpaceship(\'' + this.children[i].name + '\');">' +
			'<i class="bi bi-trash me-1"></i>Delete' +
			'</button>' +
			'</div>' +
			'</a>'
		);
		divSpaceships.append(itemSpaceship);
	}
	$("#main-panel").append(divSpaceships);
}

/*---------------------------------------------------------------------------*/

Spaceships.prototype.newSpaceship = function () {
	var divInputGroup = $('<div class="input-group-sm mb-3" id="inputGroup"> </div>');
	divInputGroup.append($('<p> &nbsp; </p>'));

	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Name</span>' +
		'<input id="name" type="text" class="form-control name" placeholder="name">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Type</span>' +
		'<input id="type" type="text" class="form-control type" placeholder="type">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Shipyard</span>' +
		'<input id="shipyard" type="text" class="form-control shipyard" placeholder="shipyard">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Crew</span>' +
		'<input id="crew" type="number" class="form-control crew" placeholder="crew">' +
		'</div>' +
		''
	));


	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">' +
		'<button type="button" class="btn btn-sm btn-outline-warning" ' + 'onclick="spaceships.createSpaceship();"><i class="bi bi-save me-1"></i> Save</button>' +
		'<button type="button" class="btn btn-sm btn-outline-primary" ' + 'onclick="spaceships.onCreateSpaceship();"><i class="bi bi-x-circle"></i> Cancel</button>' +
		'</div>'
	));

	$("#main-panel").append(divInputGroup);
}

Spaceships.prototype.createSpaceship = function () {
	let name = $("#name").val();
	let type = $("#type").val();
	let shipyard = $("#shipyard").val();
	let crew = $("#crew").val();

	console.log(name);
	console.log(type);
	console.log(shipyard);
	console.log(crew);


	var spaceships = this;
	$.ajax(
		{
			url: "./spaceships.php?create=1" +
				"&name=" + encodeURIComponent(name) +
				"&type=" + encodeURIComponent(type) +
				"&shipyard=" + encodeURIComponent(shipyard) +
				"&crew=" + crew,

			beforeSend: function (xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			}
		})
		.done(function (data) {
			console.log(data);
			spaceships.onCreateSpaceship(JSON.parse(data));
		});
}

Spaceships.prototype.onCreateSpaceship = function (message) {
	console.log("Spaceships.onCreateSpaceship");
	console.log(message);
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Spaceships.prototype.getSpaceship = function (name) {
	for (i = 0; i < this.children.length; i++) {
		if (this.children[i].name == name) {
			return this.children[i];
		}
	}

	return null;
}

/*---------------------------------------------------------------------------*/

Spaceships.prototype.search = function (searchTerm) {
	var spaceships = this;
	$.ajax(
		{
			url: "./spaceships.php",
			data: { read: 1, name: searchTerm },
			beforeSend: function (xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			}
		})
		.done(function (data) {
			console.log("Search response:", data);
			try {
				spaceships.onSearch(JSON.parse(data));
			} catch (e) {
				console.error("Parse error:", e);
			}
		})
		.fail(function (xhr, status, error) {
			console.error("Search failed:", status, error);
		});
}

Spaceships.prototype.onSearch = function (data) {
	var items = data.items;

	$("#search table").remove();

	if (!items || items.length === 0) {
		$("#search").append('<p>No results found</p>');
		return;
	}

	var table = $('<table class="table table-striped table-hover"><thead class="table-dark"><tr><th>Name</th><th>Type</th><th>Shipyard</th><th>Crew</th></tr></thead><tbody></tbody></table>');

	for (i = 0; i < items.length; i++) {
		table.append($('<tr><td>' + items[i].name + '</td><td>' + items[i].type + '</td><td>' + items[i].shipyard + '</td><td>' + items[i].crew + '</td></tr>'));
	}

	$("#search").append(table);
}

/*---------------------------------------------------------------------------*/

Spaceships.prototype.editSpaceship = function (name) {
	console.log("Spaceships.editSpaceship");

	var spaceships = this;
	var divInputGroup = $('<div class="input-group-sm mb-3" id="inputGroup"> </div>');
	divInputGroup.append($('<p> &nbsp; </p>'));

	var spaceship = spaceships.getSpaceship(name);

	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Name</span>' +
		'<input id="name" type="text" class="form-control name" placeholder="name" value="' + spaceship.name + '" readonly>' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Type</span>' +
		'<input id="type" type="text" class="form-control type" placeholder="type" value="' + spaceship.type + '">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Shipyard</span>' +
		'<input id="shipyard" type="text" class="form-control shipyard" placeholder="shipyard" value="' + spaceship.shipyard + '">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="input-group mb-2">' +
		'<span class="input-group-text">Crew</span>' +
		'<input id="crew" type="number" class="form-control crew" placeholder="crew" value="' + spaceship.crew + '">' +
		'</div>' +
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">' +
		'<button type="button" class="btn btn-sm btn-outline-warning" onclick="spaceships.updateSpaceship(\'' + name + '\');"><i class="bi bi-save me-1"></i> Save</button>' +
		'<button type="button" class="btn btn-sm btn-outline-primary" onclick="spaceships.onUpdateSpaceship();"><i class="bi bi-x-circle"></i> Cancel</button>' +
		'</div>'
	));

	$("#main-panel").append(divInputGroup);
}

Spaceships.prototype.updateSpaceship = function (name) {
	let type = $("#type").val();
	let shipyard = $("#shipyard").val();
	let crew = $("#crew").val();

	console.log(name);
	console.log(type);
	console.log(shipyard);
	console.log(crew);

	var spaceships = this;
	$.ajax(
		{
			url: "./spaceships.php?update=1" +
				"&name=" + name +
				"&type=" + type +
				"&shipyard=" + shipyard +
				"&crew=" + crew,

			beforeSend: function (xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			}
		})
		.done(function (data) {
			console.log(data);
			spaceships.onUpdateSpaceship(JSON.parse(data), name);
		});
}

Spaceships.prototype.onUpdateSpaceship = function (message) {
	console.log("Spaceships.onUpdateSpaceship");

	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Spaceships.prototype.deleteSpaceship = function (name) {
	var spaceships = this;
	$.ajax(
		{
			url: "./spaceships.php?delete=1&name=" + name,
			beforeSend: function (xhr) {
				xhr.overrideMimeType("text/plain; charset=x-user-defined");
			}
		})
		.done(function (data) {
			console.log("Delete response:", data);
			spaceships.onDeleteSpaceship(null, name);
		})
		.fail(function (xhr, status, error) {
			console.error("Delete failed:", status, error);
		});
}

Spaceships.prototype.onDeleteSpaceship = function (message, name) {
	this.read();
}

/*---------------------------------------------------------------------------*/
