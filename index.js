const ProjectModule = (function () {
    let instance;
 
    const createInstance = () => ({
	    participants: [],
	    pricing: { },
	    isBusy: false,

	    init(participants, pricing) {
	    	if(!participants || !pricing) return;
	        this.participants = Array.isArray(participants) ? participants : [];
	        this.pricing = typeof pricing === 'object' && pricing !== null ? pricing : {};
	    },

	    
	    findParticipant(functor, callbackFunction) {
	      if(this.isBusy) return false;	      
	      if(typeof functor !== 'function' || typeof callbackFunction !== 'function') return;
	     this.isBusy = true;
	      setTimeout( () => {
	        const foundParticipant = this.participants.find(functor) || null;
	        this.isBusy = false;	
	        callbackFunction(foundParticipant);
	               
	      } );
	    },

	    
	    findParticipants(functor, callbackFunction) {
	      if(this.isBusy) return false;		      
	      if(typeof functor !== 'function' || typeof callbackFunction !== 'function') return;
	      this.isBusy = true;
	      setTimeout( () => {
	        const foundParticipants = this.participants.filter(functor);
	        this.isBusy = false;	
	        callbackFunction(foundParticipants);
	      	        
	      } ); 
	    },

	    
	    addParticipant(participantObject, callbackFunction) { 
	      if(this.isBusy) return false;
	      const newParticipant = participantObject || {};
	       this.isBusy = true;
	      setTimeout(() => {
	        if(!newParticipant.hasOwnProperty('seniorityLevel') ) {
	          const error = new Error('property seniorityLevel is not provided');
	          this.isBusy = false;  
	          callbackFunction(error);
	        } else {
	          this.participants.push(newParticipant);
	          this.isBusy = false;  
	        callbackFunction();
	        }	
	            
	      });
	    },

	    removeParticipant(participantObject, callbackFunction) {
	      if(this.isBusy) return false; 
	      if(typeof participantObject !== 'object' || participantObject === null || typeof callbackFunction !== 'function') return;
	      this.isBusy = true;
	      setTimeout(() => {
	        const idx =  this.participants.indexOf(participantObject);
	        if(~idx){
	          let removedParticipant = this.participants.splice(idx, 1)[0];
	          this.isBusy = false;   
	          callbackFunction(removedParticipant);
	        } else {
	          this.isBusy = false;   
	          callbackFunction(null);
	        }	
	             
	      });
	      
	    },

	    setPricing(participantPriceObject, callbackFunction) {
	      if(this.isBusy) return false; 
	      if(typeof participantPriceObject !== 'object' || participantPriceObject === null || typeof callbackFunction !== 'function') return;
	      this.isBusy = true;
	      setTimeout(() => {
	        Object.assign(this.pricing, participantPriceObject);
	        this.isBusy = false; 
	        callbackFunction();	 	            
	      });
	    },

	    calculateSalary(periodInDays) {
	      if(typeof periodInDays !== 'number' || isNaN(periodInDays) || !isFinite(periodInDays)) return;

	      return this.participants.reduce( (acc, cur)=> {
	      	if(!this.pricing[cur.seniorityLevel]) throw new Error();
	        return acc += this.pricing[cur.seniorityLevel] * 8;
	      }, 0);
	    }
    });
 
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();





module.exports = {
    firstName: 'Tania',
    lastName: 'Nedavnia',
    task: ProjectModule
}