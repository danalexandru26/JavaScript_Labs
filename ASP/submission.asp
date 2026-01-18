<%
dim name, type, purpose

name = Request.Form("name")
type = Request.Form("type")
purpose = Request.Form("purpose")

Response.Write("<h2>Submission Received</h2>")
Response.Write("<p><strong>Name:</strong> " & name & "</p>")
Response.Write("<p><strong>Type of Project:</strong> " & type & "</p>")
Response.Write("<p><strong>Purpose:</strong> " & purpose & "</p>")
%>