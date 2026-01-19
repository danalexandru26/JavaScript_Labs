<?php
$connection = new mysqli("localhost", "root", "", "shipyard_db");

if ($connection->connect_errno) {
	echo "Failed to connect to MySQL: " . $connection->connect_error;
	exit();
}

if (isset($_GET["create"])) {
	$fields = "";
	$values = "";

	if (isset($_GET["name"])) {
		$fields .= "name";
		$values .= '"' . $_GET["name"] . '"';
	}
	if (isset($_GET["type"])) {
		$fields .= ",type";
		$values .= ',"' . $_GET["type"] . '"';
	}
	if (isset($_GET["shipyard"])) {
		$fields .= ",shipyard";
		$values .= ',"' . $_GET["shipyard"] . '"';
	}

	if (isset($_GET["crew"])) {
		$fields .= ",crew";
		$values .= ',' . $_GET["crew"] . '';
	}

	$query = "INSERT INTO spaceship(" . $fields . ") VALUES (" . $values . ")";
	$queryResult = $connection->query($query);

	if ($queryResult) {
		echo '{"error":0, "text":"new object ' . $_GET["name"] . ' was added"}';
	} else {
		echo '{"error":1, "text":"' . mysqli_error($connection) . '"}';
	}

} elseif (isset($_GET["read"])) {
	$condition = "";

	if (isset($_GET["name"])) {
		$condition = "WHERE name =" . $_GET["name"];
	} elseif (isset($_GET["type"])) {
		$condition = "WHERE type =" . $_GET["type"];
	} elseif (isset($_GET["shipyard"])) {
		$condition = "WHERE shipyard =" . $_GET["shipyard"];
	} elseif (isset($_GET["crew"])) {
		$condition = "WHERE crew =" . $_GET["crew"];
	}

	$readQuery = "SELECT * FROM spaceship" . $condition;
	$data = $connection->query($readQuery);

	$nNoOfItems = $data->num_rows;
	$index = 0;

	echo '{"items" : [';
	while ($item = $data->fetch_assoc()) {
		echo '{';
		echo '"name":"' . $item['name'] . '",';
		echo '"type":"' . $item['type'] . '",';
		echo '"shipyard":"' . $item['shipyard'] . '",';
		echo '"crew":' . $item['crew'];
		echo '}';
		if ($index != $nNoOfItems - 1)
			echo ',';
		$index++;
	}
	echo ']}';
	$data->close();
} else if (isset($_GET["delete"])) {
	$name = $_GET["name"];
	$query = "DELETE FROM spaceship WHERE name = \"" . $_GET["name"] . "\"";

	$result = $connection->query($query);
	//echo $query."<br/>";
	//echo $result."<br/>";

	if ($result) {
		echo '{"error":0, "text":"object ' . $name . ' was deleted"}';
	} else {
		echo '{"error":1, "text":"' . mysqli_error($connection) . '"}';
	}
} else if (isset($_GET["update"])) {
	$comma = '';
	$maps = '';

	if (isset($_GET["name"])) {
		$maps .= 'name="' . $_GET["name"] . '"';
		$comma = ',';
	}
	if (isset($_GET["type"])) {
		$maps .= $comma . 'type="' . $_GET["type"] . '"';
		$comma = ',';
	}
	if (isset($_GET["shipyard"])) {
		$maps .= $comma . 'shipyard="' . $_GET["shipyard"] . '"';
		$comma = ',';
	}

	$query = "UPDATE spaceship SET " . $maps . " WHERE name=\"" . $_GET["name"] . "\"";
	$result = $connection->query($query);
	//echo $query."<br/>";

	if ($result) {
		echo '{"error":0, "text":"object ' . $_GET["name"] . ' was updated"}';
	} else {
		echo '{"error":1, "text":"' . mysqli_error($connection) . '"}';
	}
}
$connection->close();
?>