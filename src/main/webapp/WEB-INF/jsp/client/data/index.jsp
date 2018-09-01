<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- http://demos.creative-tim.com/paper-dashboard-pro/examples/dashboard/overview.html
	 http://demos.creative-tim.com/material-dashboard-pro/examples/dashboard.html -->

<html ng-app="organizationApp">
<head>
  <link rel="icon" sizes="76x76" href="/images/common/favicon.png">
  <title>CRM - Admin</title>
  <jsp:include page="../../common/commonAdminLibs.jsp"/>
  <link rel="stylesheet" type="text/css" href="/css/admin/organization.css">
  <script src="/js/client/organization/app.js"></script>
  <script src="/js/client/organization/client-controller.js"></script>
  <script src="/js/client/organization/client-service.js"></script>
</head>
<body>
<div class="wrapper">
<jsp:include page="../sidebar.jsp"/>        
        <div class="main-panel">
            <jsp:include page="../nav.jsp"/>	
			<div class="content">
				<div class="container-fluid">
					<div ng-view></div>
				</div>
			</div>
		<jsp:include page="../footer.jsp"/>	
        </div>
    </div>
</body>
</html>