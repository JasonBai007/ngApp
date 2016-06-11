define(function() {
    Mock.mock('loadData', {"obj|3-6":[{
        "date"  : "@date('yyyy-MM-dd')",
        "pushup": "@integer(10, 100)",
        "squat" : "@integer(10, 100)"
    }]});
})
