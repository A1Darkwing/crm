<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- http://demos.creative-tim.com/paper-dashboard-pro/examples/dashboard/overview.html
	 http://demos.creative-tim.com/material-dashboard-pro/examples/dashboard.html -->

<html ng-app="dashboardApp">
<head>
  <link rel="icon" sizes="76x76" href="/images/common/favicon.png">
  <title>CRM</title>
  <jsp:include page="../../common/commonAdminLibs.jsp"/>
  <script src="/js/client/dashboard/app.js"></script>
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