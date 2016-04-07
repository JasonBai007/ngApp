define(function() {
    Mock.mock('loadData', {"obj|3-10":[{
        "date"  : "@date('yyyy-MM-dd')",
        "pushup": "@integer(1, 100)",
        "squat" : "@integer(1, 100)"
    }]});
})
